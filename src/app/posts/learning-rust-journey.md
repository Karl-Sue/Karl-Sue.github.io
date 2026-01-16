# My Journey Learning Rust

After years of working with JavaScript, Python, and Go, I decided to dive into Rust. Here's my learning journey and key takeaways.

## Why Rust?

I was drawn to Rust for several reasons:

- **Memory Safety**: No garbage collector, yet safe
- **Performance**: Comparable to C/C++
- **Modern Tooling**: Cargo is amazing
- **Growing Ecosystem**: Especially in WebAssembly and systems programming

## Week 1: The Ownership Model

The hardest part of learning Rust was understanding ownership:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s2
    
    // This would cause an error:
    // println!("{}", s1);
    
    println!("{}", s2); // This works
}
```

### Key Concepts

1. **Ownership Rules**:
   - Each value has a single owner
   - When the owner goes out of scope, the value is dropped
   - Values can be moved or borrowed

2. **Borrowing**:
   ```rust
   fn calculate_length(s: &String) -> usize {
       s.len()
   }
   
   fn main() {
       let s1 = String::from("hello");
       let len = calculate_length(&s1); // Borrow
       println!("Length of '{}' is {}", s1, len); // s1 still valid
   }
   ```

3. **Mutable References**:
   ```rust
   fn main() {
       let mut s = String::from("hello");
       change(&mut s);
       println!("{}", s); // Prints "hello, world"
   }
   
   fn change(s: &mut String) {
       s.push_str(", world");
   }
   ```

## Week 2: Structs and Enums

Coming from JavaScript, Rust's type system felt refreshing:

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

impl User {
    fn new(username: String, email: String) -> User {
        User {
            username,
            email,
            sign_in_count: 1,
            active: true,
        }
    }
    
    fn deactivate(&mut self) {
        self.active = false;
    }
}
```

Enums are particularly powerful:

```rust
enum WebEvent {
    PageLoad,
    PageUnload,
    KeyPress(char),
    Paste(String),
    Click { x: i64, y: i64 },
}

fn inspect(event: WebEvent) {
    match event {
        WebEvent::PageLoad => println!("page loaded"),
        WebEvent::PageUnload => println!("page unloaded"),
        WebEvent::KeyPress(c) => println!("pressed '{}'", c),
        WebEvent::Paste(s) => println!("pasted \"{}\"", s),
        WebEvent::Click { x, y } => {
            println!("clicked at x={}, y={}", x, y);
        }
    }
}
```

## Week 3: Error Handling

Rust's approach to error handling is explicit and type-safe:

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening file: {:?}", other_error)
            }
        },
    };
}
```

Using the `?` operator makes it cleaner:

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("username.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
```

## Week 4: Building a CLI Tool

I built a simple grep clone to practice:

```rust
use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();
    
    if args.len() < 3 {
        eprintln!("Usage: minigrep <query> <filename>");
        return;
    }
    
    let query = &args[1];
    let filename = &args[2];
    
    let contents = fs::read_to_string(filename)
        .expect("Failed to read file");
    
    for line in search(query, &contents) {
        println!("{}", line);
    }
}

fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    contents
        .lines()
        .filter(|line| line.contains(query))
        .collect()
}
```

## Week 5-6: Async Rust

Learning Tokio for async programming:

```rust
use tokio;

#[tokio::main]
async fn main() {
    let handle = tokio::spawn(async {
        // Simulate async work
        tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
        println!("Task completed!");
    });
    
    handle.await.unwrap();
}
```

HTTP server with Axum:

```rust
use axum::{
    routing::get,
    Router,
};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(|| async { "Hello, World!" }));

    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
```

## Challenges I Faced

### 1. The Borrow Checker

Initially, the borrow checker felt frustrating. But I learned it's helping prevent:
- Data races
- Dangling pointers
- Use-after-free bugs

### 2. Lifetimes

Understanding lifetime annotations took time:

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

### 3. Different Mindset

Coming from garbage-collected languages, I had to think differently about:
- When to use `Box`, `Rc`, or `Arc`
- Stack vs heap allocation
- Zero-cost abstractions

## Resources That Helped

1. **The Rust Book** - Essential reading
2. **Rustlings** - Great exercises
3. **Rust by Example** - Practical examples
4. **Jon Gjengset's YouTube** - Deep dives
5. **exercism.io** - Practice problems

## What I'm Building

Currently working on:
- A URL shortener service
- Contributing to open source Rust projects
- WebAssembly experiments

## Conclusion

Learning Rust is challenging but incredibly rewarding. The language forces you to think about:
- Memory management
- Error handling
- Concurrency

After 2 months, I'm comfortable with:
- ✅ Basic syntax and ownership
- ✅ Structs, enums, and pattern matching
- ✅ Error handling with Result
- ✅ Basic async programming
- ✅ Building CLI tools

Still learning:
- 🔄 Advanced lifetimes
- 🔄 Unsafe Rust
- 🔄 Macros
- 🔄 Advanced trait usage

## Next Steps

- Deep dive into the standard library
- Learn about procedural macros
- Build a web service with Actix/Axum
- Explore embedded Rust

The journey continues! 🦀

---

*Are you learning Rust? What challenges have you faced?*
