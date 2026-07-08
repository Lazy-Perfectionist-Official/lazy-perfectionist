<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# ui

## Purpose
shadcn/ui component library providing a comprehensive set of accessible, reusable UI components built on Radix UI primitives. These components form the design system foundation for the Lazy Perfectionist website.

## Key Files

| File | Description |
|------|-------------|
| *(component files) | Individual component implementations (see examples below) |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All UI components are at root level |

## For AI Agents

### Working In This Directory
- **shadcn/ui components** - Pre-built, accessible UI components
- **Built on Radix UI** primitives for accessibility
- **Tailwind CSS styling** with consistent design system
- **TypeScript support** with proper prop typing
- **Customizable and composable** for specific needs

### Component Categories

#### Form Components
- **input.tsx** - Text input fields
- **textarea.tsx** - Multi-line text inputs
- **checkbox.tsx** - Checkbox controls
- **radio-group.tsx** - Radio button groups
- **select.tsx** - Dropdown select components
- **switch.tsx** - Toggle switches
- **slider.tsx** - Range sliders
- **calendar.tsx** - Date picker components

#### Layout Components
- **card.tsx** - Card containers for content
- **separator.tsx** - Visual separators
- **resizable.tsx** - Resizable panel layouts
- **scroll-area.tsx** - Custom scroll containers
- **sidebar.tsx** - Sidebar navigation components

#### Navigation Components
- **navigation-menu.tsx** - Navigation menus
- **menubar.tsx** - Menu bar components
- **breadcrumb.tsx** - Breadcrumb navigation
- **pagination.tsx** - Pagination controls
- **tabs.tsx** - Tab interfaces
- **command.tsx** - Command palette

#### Feedback Components
- **alert.tsx** - Alert messages
- **toast.tsx**, **toaster.tsx**, **sonner.tsx** - Toast notifications
- **progress.tsx** - Progress indicators
- **skeleton.tsx** - Loading placeholders
- **alert-dialog.tsx** - Alert dialogs

#### Overlay Components
- **dialog.tsx** - Dialog windows
- **popover.tsx** - Popover overlays
- **tooltip.tsx** - Tooltip hints
- **hover-card.tsx** - Hover cards
- **drawer.tsx** - Drawer panels
- **sheet.tsx** - Sheet overlays

#### Data Display Components
- **table.tsx** - Data tables
- **badge.tsx** - Status badges
- **avatar.tsx** - User avatars
- **carousel.tsx** - Content carousels
- **chart.tsx** - Data visualization charts

#### Advanced Components
- **accordion.tsx** - Collapsible content
- **collapsible.tsx** - Collapsible containers
- **context-menu.tsx** - Context menus
- **dropdown-menu.tsx** - Dropdown menus
- **aspect-ratio.tsx** - Aspect ratio containers
- **button.tsx** - Button components
- **form.tsx** - Form components
- **input-otp.tsx** - OTP input components
- **label.tsx** - Form labels
- **toggle.tsx**, **toggle-group.tsx** - Toggle components

### Testing Requirements
- **Test accessibility** with screen readers and keyboard
- **Verify responsive behavior** across screen sizes
- **Check component interactions** work correctly
- **Validate TypeScript types** prevent errors
- **Test component composition** and customization

### Common Patterns
- **Consistent prop interfaces** across components
- **Proper ARIA attributes** for accessibility
- **Keyboard navigation** support for interactive components
- **Theme support** for consistent styling
- **Customizable styling** via className prop

### Development Guidelines
- **Use existing components** before creating custom ones
- **Follow component patterns** for consistency
- **Customize via props** rather than forking
- **Maintain accessibility** when modifying components
- **Test thoroughly** across browsers and devices

## Component Architecture

### Design Principles
- **Accessibility first** with proper ARIA attributes
- **Keyboard navigation** for all interactive elements
- **Responsive design** with mobile-first approach
- **Consistent styling** with Tailwind CSS
- **Type safety** with TypeScript props

### Styling System
- **Tailwind CSS** for component styling
- **CSS variables** for theming support
- **Consistent spacing** and typography scales
- **Color system** with semantic tokens
- **Animation utilities** for smooth transitions

### Component Patterns
- **Compound components** for complex UIs
- **Render props** for flexibility
- **Controlled and uncontrolled** modes
- **Forward refs** for DOM access
- **Proper displayName** for debugging

## Integration Points

### Project Integration
- **Import via `@/components/ui/*`** path alias
- **Used throughout `src/app/` pages**
- **Composed in feature components**
- **Styled with project design tokens**
- **Extended for specific needs**

### Customization Strategy
- **Props-based customization** preferred
- **className extension** for styling
- **Component composition** for complex UIs
- **Theme customization** via CSS variables
- **Selective component overriding** when needed

## Best Practices

### Component Usage
- **Use existing components** before building custom
- **Follow established patterns** for consistency
- **Maintain accessibility** when customizing
- **Test responsive behavior** thoroughly
- **Document custom extensions** clearly

### Performance Considerations
- **Lazy load** heavy components when possible
- **Code split** component bundles
- **Optimize re-renders** with proper memoization
- **Use CSS animations** over JavaScript when possible
- **Monitor component performance** in production

### Accessibility Standards
- **ARIA attributes** properly implemented
- **Keyboard navigation** fully functional
- **Screen reader compatibility** tested
- **High contrast** for readability
- **Focus management** implemented correctly

## Component Extension

### Customization Approaches
- **Props customization** for behavior changes
- **Styling extension** via className prop
- **Component composition** for new features
- **Theme customization** via CSS variables
- **Selective forking** when absolutely necessary

### Extension Guidelines
- **Maintain backward compatibility** when extending
- **Follow existing patterns** and conventions
- **Preserve accessibility** features
- **Test thoroughly** after modifications
- **Document changes** and additions

## Troubleshooting

### Common Issues
- **Styling conflicts**: Check Tailwind class precedence
- **Type errors**: Verify prop types and interfaces
- **Accessibility problems**: Test with screen readers
- **Performance issues**: Profile component rendering
- **Browser compatibility**: Test across target browsers

### Debugging Approaches
- **React DevTools** for component inspection
- **Browser DevTools** for styling issues
- **Screen reader testing** for accessibility
- **Performance profiling** for optimization
- **Cross-browser testing** for compatibility

## Component Examples

### Button Usage
```typescript
import { Button } from "@/components/ui/button"

<Button variant="default" onClick={handleClick}>
  Click me
</Button>
```

### Card Usage
```typescript
import { Card } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Card content goes here</CardContent>
</Card>
```

### Dialog Usage
```typescript
import { Dialog } from "@/components/ui/dialog"

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <DialogDescription>Dialog description</DialogDescription>
  </DialogContent>
</Dialog>
```

## Maintenance

### Regular Tasks
- **Update components** from shadcn/ui when needed
- **Test for breaking changes** after updates
- **Monitor accessibility** compliance
- **Optimize performance** for slow components
- **Document custom extensions**

### Update Strategy
- **Review changelog** before updates
- **Test in isolation** before integration
- **Check for breaking changes** in props
- **Update gradually** rather than all at once
- **Maintain compatibility** with existing code

## Future Considerations

### Component Evolution
- **Monitor shadcn/ui** for new components and features
- **Consider component requests** for missing patterns
- **Evaluate performance** of complex components
- **Plan for theming** and design system updates
- **Balance custom vs. standard** components

### Design System Growth
- **Establish patterns** for component composition
- **Create design tokens** for consistent styling
- **Document usage guidelines** for teams
- **Build component playground** for testing
- **Plan for accessibility** improvements

<!-- MANUAL: Component-specific notes and customization guidelines -->