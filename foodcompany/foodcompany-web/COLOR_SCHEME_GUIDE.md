# Wingz Impex Color Scheme Guide

## Overview
This guide helps maintain a consistent color scheme across all components and pages based on your logo colors.

## Current Color System

### Primary Colors (Custom Brand Theme)
Your current primary color scheme is based on your custom brand color:

- **Primary Brand**: `wingzimpex-brand` (#001a33) - Very Dark Navy Blue - Main brand color
- **Primary Light**: `wingzimpex-brand-light` (#003366) - Lighter version for hover states
- **Primary Dark**: `wingzimpex-brand-dark` (#000d1a) - Even darker version
- **Primary Light**: `indigo-100` (#dbeafe) - Backgrounds
- **Primary Lighter**: `indigo-50` (#eff6ff) - Subtle backgrounds

### Secondary Colors
- **Green**: `green-600` (#16a34a) - Success/positive elements
- **Yellow**: `yellow-600` (#ca8a04) - Warning/attention elements
- **Purple**: `purple-600` (#9333ea) - Additional accent color

## Implementation Steps

### 1. Update Logo Colors (If Needed)
If your logo uses different indigo shades, update the values in `src/styles/colors.ts`:

```typescript
// Example: If your logo uses a different indigo
primary: {
  600: 'bg-indigo-600', // Change from indigo-600 to match your logo
  700: 'bg-indigo-700',
  // ... other shades
}
```

### 2. Use Color Constants
Import and use the color constants in your components:

```typescript
import { colors, colorSchemes } from '../styles/colors';

// Instead of hardcoded classes like:
className="bg-indigo-600 text-white"

// Use:
className={`${colors.primary[600]} ${colors.primaryText.white}`}

// Or use predefined schemes:
className={colorSchemes.button.primary}
```

### 3. Component Updates Needed

#### High Priority (Most Visible):
1. **Header/Navigation** - Main brand exposure
2. **Hero Section** - First impression
3. **Product/Service Cards** - Core content
4. **Buttons & CTAs** - User interactions
5. **Footer** - Brand consistency

#### Medium Priority:
1. **Forms** - Input fields and validation
2. **Loading States** - Spinners and placeholders
3. **Status Messages** - Success, error, warning states
4. **Icons** - Consistent icon colors

#### Low Priority:
1. **Admin Panel** - Internal use
2. **Debug Elements** - Development only

## Quick Implementation Examples

### Buttons
```typescript
// Primary Button
<button className={colorSchemes.button.primary}>
  View Details
</button>

// Secondary Button
<button className={colorSchemes.button.secondary}>
  Learn More
</button>
```

### Cards
```typescript
// Product/Service Card
<div className={colorSchemes.card.primary}>
  {/* Card content */}
</div>
```

### Badges
```typescript
// Category Badge
<span className={colorSchemes.badge.primary}>
  Auto AC
</span>
```

### Gradients
```typescript
// Hero Section
<section className={colors.gradients.primary}>
  {/* Hero content */}
</section>

// Background
<div className={colors.gradients.primaryLight}>
  {/* Content */}
</div>
```

## Color Usage Guidelines

### Primary Brand Usage:
- **Main CTAs** (View Details, Contact Us)
- **Navigation highlights**
- **Brand elements** (logo, headers)
- **Interactive elements** (buttons, links)

### Secondary Colors Usage:
- **Green**: Success messages, positive actions
- **Yellow**: Warnings, attention-grabbing elements
- **Purple**: Premium features, special highlights

### Neutral Colors:
- **Gray-900**: Main text
- **Gray-600**: Secondary text
- **Gray-300**: Borders, dividers
- **Gray-50**: Light backgrounds

## Testing Your Color Scheme

1. **Check Contrast**: Ensure text is readable on colored backgrounds
2. **Test Accessibility**: Use tools like WebAIM contrast checker
3. **Mobile Testing**: Colors should look good on all screen sizes
4. **Print Testing**: If applicable, ensure colors work in print

## Maintenance

### When to Update Colors:
- Logo redesign
- Brand refresh
- Accessibility improvements
- Seasonal campaigns (if applicable)

### How to Update:
1. Modify `src/styles/colors.ts`
2. Update any hardcoded color classes
3. Test across all components
4. Update documentation

## Current Implementation Status

### ✅ Already Using Brand Theme:
- ProductCard component
- ServiceCard component
- HomeProducts section
- Services section
- Products page
- Services page
- Contact page
- Header component
- Hero component
- WhoWeAre component
- WhyChooseUs component
- SubDealers component
- MenuNav component

### 🔄 Needs Color System Integration:
- Footer
- Forms
- Loading states
- Error messages

### 📋 Next Steps:
1. Update Footer component to use brand colors
2. Standardize form styling
3. Create consistent loading states
4. Update error/success message styling

## Benefits of This System

1. **Consistency**: All components use the same color palette
2. **Maintainability**: Easy to update colors in one place
3. **Brand Recognition**: Consistent visual identity
4. **Accessibility**: Proper contrast ratios
5. **Scalability**: Easy to add new color variations

## Support

If you need help implementing this color scheme or have questions about specific components, refer to the existing components that already use the brand theme as examples. 