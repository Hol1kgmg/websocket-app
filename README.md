# braille-finder

Visual braille Unicode search tool with 256-character pattern matching

## Prerequisites

- [Nix](https://nixos.org/) - Reproducible development environment management

  ```bash
  # Install Nix (if not already installed)
  # macOS / Linux
  sh <(curl -L https://nixos.org/nix/install)

  # Enable flakes (if not already enabled)
  mkdir -p ~/.config/nix
  echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf
  ```

## Setup

```bash
# Clone repository
git clone https://github.com/Hol1kgmg/braille-finder.git
cd braille-finder

# Enter Nix development environment (installs all tools automatically)
nix develop

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:3000/

## Development

### Development Environment

```bash
# Enter development environment (includes Node.js 20, oxlint, TypeScript, etc.)
nix develop

# After first setup, just use this command before starting work
nix develop
```

### Linting

```bash
cd frontend

# Run linter
oxlint

# Auto-fix issues
oxlint --fix
```

### Pre-commit Hooks

This project uses automated pre-commit hooks for code quality:

- **nil** - Nix file linting
- **oxlint** - JavaScript/TypeScript linting
- **treefmt** - Auto-formatting (nixfmt, prettier)

Hooks are automatically installed when you run `nix develop`.

### Tools managed by Nix

- **Node.js 20** - JavaScript runtime
- **oxlint** - Fast JavaScript/TypeScript linter
- **TypeScript** - Type checking
- **Git** - Version control

### Project Structure

```
frontend/
├── src/
│   └── app/          # Next.js App Router
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
└── public/           # Static assets
```
