'use client';

import React, { useState } from 'react';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import AiResponseRenderer from '@/components/ui/AiResponseRenderer';

const exampleMarkdown = `# Markdown Formatting Example

This is a demonstration of markdown formatting with proper styling.

## Code Blocks

\`\`\`javascript
// JavaScript code example
function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 10);
console.log(\`The sum is \${result}\`);
\`\`\`

\`\`\`csharp
// C# code example
public class RedisService : IRedisService 
{
    private readonly IConnectionMultiplexer _redis;
    private readonly IDatabase _db;
    
    public RedisService(IConnectionMultiplexer redis) 
    {
        _redis = redis;
        _db = redis.GetDatabase();
    }
    
    public async Task<bool> SetAsync<T>(string key, T value, TimeSpan? expiration = null) 
    {
        var serializedValue = JsonSerializer.Serialize(value);
        return await _db.StringSetAsync(key, serializedValue, expiration);
    }
}
\`\`\`

## Lists

### Unordered List

* Item 1
* Item 2
  * Nested item 2.1
  * Nested item 2.2
* Item 3

### Ordered List

1. First item
2. Second item
3. Third item

## Tables

| Name | Type | Description |
|------|------|-------------|
| id | string | Unique identifier |
| title | string | The title of the item |
| created | date | Creation timestamp |
| status | enum | Current status |

## Links and Emphasis

Visit [GitHub](https://github.com) for more information.

*This text is italicized*

**This text is bold**

***This text is bold and italicized***

## Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> It can also have multiple paragraphs.

## Horizontal Rule

---

## Images

![Example Image](https://via.placeholder.com/150)
`;

const exampleAiResponse = `This is my response now
I'll show you a complete implementation of Redis in .NET using StackExchange.Redis.

1. First, install the NuGet package:
\`\`\`bash
dotnet add package StackExchange.Redis
\`\`\`

2. Create Redis Configuration:
\`\`\`csharp
public class RedisConfiguration
{
    public string ConnectionString { get; set; }
}
\`\`\`

3. Create Redis Service Interface and Implementation:
\`\`\`csharp
public interface IRedisService
{
    Task<bool> SetAsync<T>(string key, T value, TimeSpan? expiration = null);
    Task<T> GetAsync<T>(string key);
    Task<bool> RemoveAsync(string key);
    Task<bool> ExistsAsync(string key);
}

public class RedisService : IRedisService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly IDatabase _db;

    public RedisService(IConnectionMultiplexer redis)
    {
        _redis = redis;
        _db = redis.GetDatabase();
    }

    public async Task<bool> SetAsync<T>(string key, T value, TimeSpan? expiration = null)
    {
        var serializedValue = JsonSerializer.Serialize(value);
        return await _db.StringSetAsync(key, serializedValue, expiration);
    }

    public async Task<T> GetAsync<T>(string key)
    {
        var value = await _db.StringGetAsync(key);
        if (value.IsNull) return default;
        return JsonSerializer.Deserialize<T>(value);
    }

    public async Task<bool> RemoveAsync(string key)
    {
        return await _db.KeyDeleteAsync(key);
    }

    public async Task<bool> ExistsAsync(string key)
    {
        return await _db.KeyExistsAsync(key);
    }
}
\`\`\`

4. Register Redis in Program.cs:
\`\`\`csharp
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddRedis(this IServiceCollection services, IConfiguration configuration)
    {
        var redisConfig = configuration.GetSection("Redis").Get<RedisConfiguration>();
        services.AddSingleton<IConnectionMultiplexer>(sp => ConnectionMultiplexer.Connect(redisConfig.ConnectionString));
        services.AddSingleton<IRedisService, RedisService>();
        return services;
    }
}
\`\`\`

5. Add Redis configuration in appsettings.json:
\`\`\`json
{
    "Redis": {
        "ConnectionString": "localhost:6379"
    }
}
\`\`\`

6. Example usage in a controller or service:
\`\`\`csharp
public class ExampleController : ControllerBase
{
    private readonly IRedisService _redisService;

    public ExampleController(IRedisService redisService)
    {
        _redisService = redisService;
    }

    [HttpGet]
    public async Task<IActionResult> GetData(string key)
    {
        var data = await _redisService.GetAsync<string>(key);
        if (data == null) return NotFound();
        return Ok(data);
    }

    [HttpPost]
    public async Task<IActionResult> SetData(string key, string value)
    {
        await _redisService.SetAsync(key, value, TimeSpan.FromMinutes(30));
        return Ok();
    }
}
\`\`\`

7. Optional: Add Health Check:
\`\`\`csharp
public static class HealthCheckExtensions
{
    public static IHealthChecksBuilder AddRedisHealthCheck(this IHealthChecksBuilder builder, string connectionString)
    {
        return builder.AddRedis(connectionString, "Redis", HealthStatus.Unhealthy);
    }
}

// In Program.cs
builder.Services.AddHealthChecks()
    .AddRedisHealthCheck(redisConfig.ConnectionString);
\`\`\`

This implementation provides:
- Basic CRUD operations with Redis
- JSON serialization/deserialization
- Expiration support
- Health checks
- Dependency injection setup
- Type-safe operations

Remember to:
1. Install Redis on your machine or use a Redis container
2. Ensure the Redis server is running
3. Use the correct connection string
4. Handle exceptions appropriately in production code
5. Consider implementing retry policies using Polly
6. Implement proper logging

You can enhance this implementation by adding:
- Distributed caching
- Pub/Sub functionality
- Redis collections (Lists, Sets, Sorted Sets)
- Batch operations
- Connection retry policies
- Logging and monitoring`;

const MarkdownDemoPage: React.FC = () => {
  const [markdown, setMarkdown] = useState(exampleMarkdown);
  const [aiResponse, setAiResponse] = useState(exampleAiResponse);

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Markdown Formatting Demo</h1>
      
      <div className="flex mb-6 gap-4">
        <a href="#standard-markdown" className="px-4 py-2 bg-blue-600 text-white rounded">Standard Markdown</a>
        <a href="#ai-response" className="px-4 py-2 bg-blue-600 text-white rounded">AI Response Renderer</a>
      </div>
      
      {/* Standard Markdown Editor Section */}
      <section id="standard-markdown" className="mb-16 p-6 border border-gray-300 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Standard Markdown Editor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Edit Markdown</h3>
            <textarea
              className="w-full h-[300px] p-2 border border-gray-300 rounded font-mono"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Preview</h3>
            <div className="border border-gray-300 rounded p-4 h-[400px] overflow-auto relative">
              <div className="absolute right-2 top-2 text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded-full opacity-70">
                Scroll to see more
              </div>
              <MarkdownRenderer content={markdown} />
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Response Renderer Section */}
      <section id="ai-response" className="mb-16 p-6 border border-gray-300 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">AI Response Renderer</h2>
        <p className="mb-4">This demonstrates how AI responses with code blocks and formatting are rendered:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Raw AI Response</h3>
            <textarea
              className="w-full h-[300px] p-2 border border-gray-300 rounded font-mono"
              value={aiResponse}
              onChange={(e) => setAiResponse(e.target.value)}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Formatted Output</h3>
            <div className="border border-gray-300 rounded p-4 h-[400px] overflow-auto bg-white relative">
              <div className="absolute right-2 top-2 text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded-full opacity-70">
                Scroll to see more
              </div>
              <AiResponseRenderer content={aiResponse} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarkdownDemoPage;
