#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

# Get the directory where the script is located
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
# Go to the project root directory (2 levels up from scripts dir)
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
cd "$PROJECT_ROOT"

# Display help if no arguments provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  run               Run all pending migrations"
    echo "  create <name>     Create a new migration with the given name"
    echo "  generate <name>   Generate a migration from entity changes with the given name"
    echo "  revert            Revert the most recent migration"
    echo ""
    echo "Examples:"
    echo "  $0 run"
    echo "  $0 create AddUserEmail"
    echo "  $0 generate AddUserPhone"
    echo "  $0 revert"
    exit 1
fi

COMMAND=$1
MIGRATION_NAME=$2

handle_error() {
    echo "Error: $1 command failed"
    exit 1
}

case "$COMMAND" in
run)
    echo "Running migrations..."
    pnpm typeorm-ts-node-commonjs migration:run -d src/database/data-source-local.ts || handle_error "Migration run"
    ;;
create)
    if [ -z "$MIGRATION_NAME" ]; then
        echo "Error: Migration name is required for create command"
        exit 1
    fi
    echo "Creating migration: $MIGRATION_NAME"
    npx typeorm-ts-node-commonjs migration:create "src/migrations/$MIGRATION_NAME" || handle_error "Migration create"
    ;;
generate)
    if [ -z "$MIGRATION_NAME" ]; then
        echo "Error: Migration name is required for generate command"
        exit 1
    fi
    echo "Generating migration: $MIGRATION_NAME"
    npx typeorm-ts-node-commonjs migration:generate "src/migrations/$MIGRATION_NAME" -d src/database/data-source-local.ts || handle_error "Migration generate"
    ;;
revert)
    echo "Reverting last migration..."
    npx typeorm-ts-node-commonjs migration:revert -d src/database/data-source-local.ts || handle_error "Migration revert"
    ;;
*)
    echo "Unknown command: $COMMAND"
    echo "Use: run, create, generate, or revert"
    exit 1
    ;;
esac

echo "Done!"
