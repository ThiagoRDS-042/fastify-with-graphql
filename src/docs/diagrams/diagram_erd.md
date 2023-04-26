```mermaid
erDiagram

        Category {
            social social
fashion fashion
technology technology
games games
nature nature
        }
    
  "authors" {
    String id "🗝️"
    String name 
    String phone 
    String email 
    String password 
    DateTime created_at 
    DateTime updated_at 
    DateTime deleted_at "❓"
    }
  

  "posts" {
    String id "🗝️"
    String title 
    String tag 
    String content 
    String description "❓"
    Category category 
    String authorId 
    Boolean is_active 
    DateTime created_at 
    DateTime updated_at 
    DateTime published_at "❓"
    }
  
    "authors" o{--}o "posts" : "posts"
    "posts" o|--|| "Category" : "enum:category"
    "posts" o|--|| "authors" : "author"
```
