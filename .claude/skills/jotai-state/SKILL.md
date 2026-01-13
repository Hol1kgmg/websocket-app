______________________________________________________________________

## name: jotai-state description: Lightweight state management patterns using Jotai atoms. Covers primitive atoms, derived atoms, write-only atoms, and custom hooks for state access. Use when designing React state management, introducing Jotai, or architecting global state.

This skill guides creation of scalable, type-safe state management using Jotai's atomic model. Implement minimal re-renders through granular subscriptions.

## Atom Design Patterns

### Primitive Atoms (Source of Truth)

```typescript
export const selectedItemsAtom = atom<readonly ItemType[]>([]);
```

### Write-Only Atoms (Actions)

```typescript
export const toggleItemAtom = atom(
  null,
  (get, set, item: ItemType): void => {
    const current = get(selectedItemsAtom);
    const newItems = current.includes(item)
      ? current.filter((i) => i !== item)
      : Object.freeze([...current, item]);
    set(selectedItemsAtom, newItems);
  }
);
```

### Derived Atoms (Computed Values)

```typescript
export const filteredDataAtom = atom((get): readonly ProcessedItem[] => {
  const selected = get(selectedItemsAtom);
  return allData.map((item) => ({
    ...item,
    isSelected: selected.includes(item.id),
  }));
});
```

## Custom Hook Pattern

```typescript
export const useDomainState = (): UseDomainStateReturn => {
  const selectedItems = useAtomValue(selectedItemsAtom);
  const toggleItem = useSetAtom(toggleItemAtom);
  return { selectedItems, toggleItem };
};
```

## Directory Structure

```
src/
├── atoms/        # Atom definitions (one file per domain)
├── hooks/        # Custom hooks wrapping atoms
└── types/        # Type definitions including atom types
```

## Best Practices

- **Immutability**: Use `Object.freeze()` and `readonly` for state immutability
- **Single responsibility**: One atom = one state or one action
- **Explicit types**: Define return types for all atoms and hooks
- **Encapsulation**: Components access atoms only through custom hooks
- **Derived first**: Express computable values as derived atoms

## Anti-Patterns

**BAD**: Direct atom manipulation in components

```typescript
const [items, setItems] = useAtom(selectedItemsAtom);
setItems([...items, newItem]); // Logic scattered across components
```

**GOOD**: Operations through write-only atoms

```typescript
const toggleItem = useSetAtom(toggleItemAtom);
toggleItem(newItem); // Logic centralized in atom
```

**BAD**: Storing derived state as primitive atom

```typescript
const filteredAtom = atom<Item[]>([]); // Manually updated
```

**GOOD**: Using derived atom for computed values

```typescript
const filteredAtom = atom((get) => computeFiltered(get(sourceAtom)));
```
