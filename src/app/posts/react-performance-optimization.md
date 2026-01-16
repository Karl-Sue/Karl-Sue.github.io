# React Performance Optimization Techniques

Performance is critical for user experience. In this guide, I'll share practical techniques to optimize React applications and reduce unnecessary re-renders.

## Measuring Performance

Before optimizing, you need to measure. Use React DevTools Profiler:

```javascript
import { Profiler } from 'react';

function onRenderCallback(
  id, // component identifier
  phase, // "mount" or "update"
  actualDuration, // time spent rendering
  baseDuration, // estimated time without memoization
  startTime, // when React began rendering
  commitTime // when React committed the update
) {
  console.log(`${id} took ${actualDuration}ms to render`);
}

<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>
```

## 1. React.memo

Prevent unnecessary re-renders of functional components:

```javascript
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{data}</div>;
});

// With custom comparison
const MemoizedComponent = React.memo(
  MyComponent,
  (prevProps, nextProps) => {
    // Return true if passing nextProps would return the same result
    return prevProps.id === nextProps.id;
  }
);
```

## 2. useMemo Hook

Memoize expensive calculations:

```javascript
function ProductList({ products, filter }) {
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## 3. useCallback Hook

Memoize callback functions:

```javascript
function ParentComponent() {
  const [count, setCount] = useState(0);

  // Without useCallback, this creates a new function on every render
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []); // Empty deps means this function never changes

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## 4. Code Splitting

Split your code into smaller bundles:

```javascript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## 5. Virtualization

Render only visible items in long lists:

```javascript
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

## 6. Debouncing and Throttling

Control the rate of function execution:

```javascript
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((value) => {
      // API call here
      console.log('Searching for:', value);
    }, 500),
    []
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  return <input value={searchTerm} onChange={handleChange} />;
}
```

## 7. Avoid Anonymous Functions in JSX

Bad:
```javascript
<button onClick={() => handleClick(item.id)}>Click</button>
```

Good:
```javascript
const handleItemClick = useCallback(() => {
  handleClick(item.id);
}, [item.id]);

<button onClick={handleItemClick}>Click</button>
```

## 8. Use Production Build

Always use production builds for deployment:

```bash
npm run build
```

Production builds:
- Remove PropTypes checks
- Minimize code
- Remove warnings
- Enable performance optimizations

## 9. Image Optimization

```javascript
import { useState } from 'react';

function OptimizedImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="skeleton" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </>
  );
}
```

## 10. Key Prop Optimization

Use stable IDs as keys:

```javascript
// Bad
{items.map((item, index) => <Item key={index} {...item} />)}

// Good
{items.map((item) => <Item key={item.id} {...item} />)}
```

## Conclusion

Remember:
1. **Measure first** - Don't optimize prematurely
2. **Use React DevTools Profiler** to find bottlenecks
3. **Memoize wisely** - Not everything needs memoization
4. **Split code** for faster initial loads
5. **Virtualize long lists**

Performance optimization is an ongoing process. Keep measuring and improving!
