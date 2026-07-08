<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# hooks

## Purpose
Custom React hooks providing reusable logic and state management for common functionality across the application. Encapsulates complex stateful logic for use in components.

## Key Files

| File | Description |
|------|-------------|
| `use-mobile.ts` | Custom hook for detecting mobile viewport and responsive behavior |
| `use-toast.ts` | Toast notification system with state management and API |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All custom hooks are at root level |

## For AI Agents

### Working In This Directory
- **Custom React hooks** for reusable logic
- **State management** solutions for common patterns
- **Side effects** and lifecycle management
- **Type-safe** hook implementations
- **Well-documented** hook APIs

### Hook Architecture

#### Hook Types
- **Viewport hooks** for responsive design
- **State management hooks** for complex state
- **API integration hooks** for data fetching
- **Form handling hooks** for user input
- **Utility hooks** for common operations

#### Hook Conventions
- **'use' prefix** for hook naming
- **TypeScript generics** for type safety
- **Proper dependency arrays** for effects
- **Cleanup functions** for side effects
- **Error handling** for robust operation

### Testing Requirements
- **Test hook behavior** with various inputs
- **Verify cleanup** functions run correctly
- **Test error handling** and edge cases
- **Check TypeScript types** prevent errors
- **Verify performance** with proper memoization

### Common Patterns
- **Custom hooks** for reusable stateful logic
- **Composition** of smaller hooks for complex behavior
- **Generic hooks** for type reusability
- **Error boundaries** for hook error handling
- **Performance optimization** with memoization

### Development Guidelines
- **Keep hooks focused** on single responsibilities
- **Use proper TypeScript** for type safety
- **Handle errors** gracefully with fallbacks
- **Document hook usage** and parameters
- **Test thoroughly** with use cases

## Hook Library

### useMobile Hook (`use-mobile.ts`)

#### Purpose
Detects mobile viewport dimensions and provides responsive behavior utilities.

#### Features
- **Viewport size detection** with breakpoints
- **Mobile device detection** based on screen width
- **Reactive updates** on window resize
- **Server-side rendering** safe with defaults
- **Type-safe** return values

#### Usage Pattern
```typescript
const isMobile = useMobile()
// Returns: boolean indicating mobile viewport
```

#### Dependencies
- **React hooks** (useState, useEffect)
- **Window object** with proper SSR handling
- **Breakpoint constants** for mobile detection

### useToast Hook (`use-toast.ts`)

#### Purpose
Toast notification system for user feedback and alerts.

#### Features
- **Toast state management** with add/remove functions
- **Auto-dismiss** with configurable timeouts
- **Multiple toast** support with stacking
- **Action buttons** and interactive elements
- **Animation support** for smooth transitions

#### Usage Pattern
```typescript
const { toast } = useToast()
toast({ title: "Success", description: "Operation completed" })
```

#### Dependencies
- **React hooks** for state management
- **Toast components** from UI library
- **Animation libraries** for transitions

## Hook Development Guidelines

### Hook Design Principles

#### Single Responsibility
- **One primary purpose** per hook
- **Composable design** for combining hooks
- **Clear API** with intuitive parameters
- **Predictable behavior** in all scenarios
- **Well-documented** usage examples

#### Performance Considerations
- **Memoization** for expensive computations
- **Proper dependency arrays** to prevent re-runs
- **Cleanup functions** to prevent memory leaks
- **Debouncing/throttling** for frequent updates
- **Lazy initialization** when appropriate

### TypeScript Best Practices

#### Type Safety
- **Generic types** for reusable hooks
- **Proper return types** for hook APIs
- **Parameter typing** for function parameters
- **Optional parameters** with proper defaults
- **Type narrowing** for conditional logic

#### Error Handling
- **Error boundaries** for hook failures
- **Fallback values** for error states
- **Error logging** for debugging
- **User-friendly** error messages
- **Recovery strategies** for common failures

## Common Hook Patterns

### Data Fetching Hooks
- **API integration** with proper error handling
- **Loading states** for async operations
- **Caching strategies** for performance
- **Retry logic** for failed requests
- **Invalidation strategies** for stale data

### Form Handling Hooks
- **Input validation** with real-time feedback
- **Submit handling** with proper state management
- **Error management** for form fields
- **Success/error feedback** for submissions
- **Reset functionality** for form clearing

### Lifecycle Management Hooks
- **Component lifecycle** management
- **Side effect handling** with cleanup
- **Subscription management** for data streams
- **Event listener management** for browser events
- **Animation control** for visual effects

## Integration Points

### Component Integration
- **Used by components** in `src/components/`
- **Imported by pages** in `src/app/`
- **Shared across features** for consistency
- **Type-safe props** for component integration
- **Performance optimized** for component rendering

### External Library Integration
- **TanStack Query** for server state hooks
- **Zustand** for global state hooks
- **React Hook Form** for form hooks
- **Framer Motion** for animation hooks
- **Next.js** for routing and framework hooks

## Best Practices

### Hook Implementation
- **Proper dependency arrays** for useEffect
- **Cleanup functions** for side effects
- **Error boundaries** for error handling
- **Memoization** for performance
- **TypeScript** for type safety

### Hook Usage
- **Follow React rules** of hooks
- **Use in component level** only
- **Consistent calling** order in components
- **Proper naming** conventions
- **Documentation** for complex hooks

## Testing Strategies

### Unit Testing
- **Test hook behavior** with various inputs
- **Verify cleanup** functions work correctly
- **Test error cases** and edge conditions
- **Mock dependencies** for isolated testing
- **Test TypeScript types** prevent errors

### Integration Testing
- **Test with components** using hooks
- **Verify hook interactions** work correctly
- **Test performance** with real-world scenarios
- **Check memory leaks** with long-running operations
- **Test concurrent usage** in multiple components

## Troubleshooting

### Common Issues
- **Hook rules violations**: Ensure hooks are called at component level
- **Dependency array issues**: Check for missing or excessive dependencies
- **Memory leaks**: Verify cleanup functions run correctly
- **Performance problems**: Profile and optimize expensive operations
- **TypeScript errors**: Check generic types and parameter typing

### Debugging Approaches
- **React DevTools** for hook inspection
- **Console logging** for hook behavior
- **TypeScript errors** for type issues
- **Performance profiling** for optimization
- **Unit tests** for behavior verification

<!-- MANUAL: Hook-specific notes and implementation details -->