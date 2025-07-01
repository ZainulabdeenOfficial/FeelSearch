import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { query, emotion, timestamp } = await request.json()

    // Map emotions to quote categories and tags
    const categoryMap = {
      happy: { tags: ["happiness", "joy", "positive", "success"], limit: 8 },
      sad: { tags: ["inspirational", "hope", "healing", "strength"], limit: 6 },
      anxious: { tags: ["motivational", "courage", "peace", "calm"], limit: 6 },
      nostalgic: { tags: ["life", "memories", "time", "wisdom"], limit: 6 },
      motivated: { tags: ["success", "motivational", "achievement", "goals"], limit: 8 },
      overwhelmed: { tags: ["wisdom", "simplicity", "focus", "clarity"], limit: 6 },
      peaceful: { tags: ["peace", "zen", "mindfulness", "tranquility"], limit: 6 },
      energized: { tags: ["motivational", "action", "energy", "power"], limit: 8 },
      creative: { tags: ["inspirational", "creativity", "art", "imagination"], limit: 6 },
      romantic: { tags: ["love", "romance", "relationships", "heart"], limit: 6 },
      adventurous: { tags: ["life", "adventure", "courage", "exploration"], limit: 6 },
      cozy: { tags: ["happiness", "comfort", "home", "contentment"], limit: 6 },
    }

    const emotionData = categoryMap[emotion] || categoryMap.happy
    const randomTag = emotionData.tags[Math.floor(Math.random() * emotionData.tags.length)]

    // Try Quotable API (free, no auth required) with multiple attempts for variety
    const attempts = [
      { tags: randomTag, limit: emotionData.limit },
      { tags: emotionData.tags.join("|"), limit: Math.floor(emotionData.limit / 2) },
      { author: getRandomAuthor(emotion), limit: 4 },
    ]

    for (const attempt of attempts) {
      try {
        let url = `https://api.quotable.io/quotes?limit=${attempt.limit}`

        if (attempt.tags) {
          url += `&tags=${attempt.tags}`
        }
        if (attempt.author) {
          url += `&author=${attempt.author}`
        }

        // Add randomization
        url += `&skip=${Math.floor(Math.random() * 100)}`

        const quotesResponse = await fetch(url)

        if (quotesResponse.ok) {
          const quotesData = await quotesResponse.json()
          if (quotesData.results && quotesData.results.length > 0) {
            const enhancedQuotes = quotesData.results.map((quote) => ({
              content: quote.content,
              author: quote.author,
              tags: quote.tags,
              length: quote.length,
              dateAdded: quote.dateAdded,
              id: quote._id,
            }))

            return NextResponse.json({
              quotes: shuffleArray(enhancedQuotes),
              timestamp: new Date().toISOString(),
              source: "Quotable API",
            })
          }
        }
      } catch (apiError) {
        console.log(`Quotable API attempt failed: ${apiError.message}`)
        continue
      }
    }

    // Try ZenQuotes API as backup (free, no auth required)
    try {
      const zenResponse = await fetch(`https://zenquotes.io/api/quotes`)

      if (zenResponse.ok) {
        const zenData = await zenResponse.json()
        if (zenData && zenData.length > 0) {
          const filteredQuotes = zenData
            .filter((quote) => quote.q && quote.a && quote.q.length > 20)
            .map((quote) => ({
              content: quote.q,
              author: quote.a,
              tags: [emotion, "wisdom"],
              length: quote.q.length,
            }))
            .slice(0, emotionData.limit)

          if (filteredQuotes.length > 0) {
            return NextResponse.json({
              quotes: shuffleArray(filteredQuotes),
              timestamp: new Date().toISOString(),
              source: "ZenQuotes API",
            })
          }
        }
      }
    } catch (zenError) {
      console.log("ZenQuotes API failed, using curated content")
    }

    // Fallback to enhanced curated quotes
    const curatedQuotes = getEnhancedCuratedQuotes(emotion, randomTag)
    return NextResponse.json({
      quotes: shuffleArray(curatedQuotes),
      timestamp: new Date().toISOString(),
      source: "Curated Collection",
    })
  } catch (error) {
    console.error("Quotes search error:", error)
    const curatedQuotes = getEnhancedCuratedQuotes("happy", "happiness")
    return NextResponse.json({
      quotes: shuffleArray(curatedQuotes),
      timestamp: new Date().toISOString(),
      source: "Curated Collection",
    })
  }
}

function getRandomAuthor(emotion) {
  const authorsByEmotion = {
    happy: ["Maya Angelou", "Walt Disney", "Winston Churchill", "Oprah Winfrey"],
    sad: ["Rumi", "Maya Angelou", "Viktor Frankl", "Helen Keller"],
    motivated: ["Steve Jobs", "Vince Lombardi", "Theodore Roosevelt", "Nelson Mandela"],
    peaceful: ["Buddha", "Lao Tzu", "Thich Nhat Hanh", "Dalai Lama"],
    creative: ["Pablo Picasso", "Steve Jobs", "Maya Angelou", "Leonardo da Vinci"],
    romantic: ["Pablo Neruda", "Rumi", "Shakespeare", "Maya Angelou"],
    adventurous: ["Mark Twain", "Helen Keller", "Theodore Roosevelt", "Ernest Hemingway"],
  }

  const authors = authorsByEmotion[emotion] || authorsByEmotion.happy
  return authors[Math.floor(Math.random() * authors.length)]
}

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function getEnhancedCuratedQuotes(emotion, tag) {
  const quotesByEmotion = {
    happy: [
      {
        content: "Happiness is not something ready made. It comes from your own actions.",
        author: "Dalai Lama",
        tags: ["happiness", "wisdom", "action"],
        length: 65,
      },
      {
        content: "The purpose of our lives is to be happy.",
        author: "Dalai Lama",
        tags: ["happiness", "life", "purpose"],
        length: 38,
      },
      {
        content: "Happiness is when what you think, what you say, and what you do are in harmony.",
        author: "Mahatma Gandhi",
        tags: ["happiness", "harmony", "integrity"],
        length: 78,
      },
      {
        content: "Keep your face always toward the sunshine—and shadows will fall behind you.",
        author: "Walt Whitman",
        tags: ["happiness", "optimism", "positive"],
        length: 73,
      },
      {
        content: "The most important thing is to enjoy your life—to be happy—it's all that matters.",
        author: "Audrey Hepburn",
        tags: ["happiness", "life", "joy"],
        length: 79,
      },
      {
        content: "Happiness is not by chance, but by choice.",
        author: "Jim Rohn",
        tags: ["happiness", "choice", "wisdom"],
        length: 41,
      },
    ],
    sad: [
      {
        content: "The wound is the place where the Light enters you.",
        author: "Rumi",
        tags: ["healing", "wisdom", "hope"],
        length: 48,
      },
      {
        content: "What we plant in the soil of contemplation, we shall reap in the harvest of action.",
        author: "Meister Eckhart",
        tags: ["contemplation", "growth", "wisdom"],
        length: 81,
      },
      {
        content: "The darker the night, the brighter the stars.",
        author: "Fyodor Dostoevsky",
        tags: ["hope", "strength", "perseverance"],
        length: 42,
      },
      {
        content:
          "Every man has his secret sorrows which the world knows not; and often times we call a man cold when he is only sad.",
        author: "Henry Wadsworth Longfellow",
        tags: ["understanding", "empathy", "sadness"],
        length: 115,
      },
      {
        content: "Tears are words that need to be written.",
        author: "Paulo Coelho",
        tags: ["emotions", "expression", "healing"],
        length: 40,
      },
    ],
    motivated: [
      {
        content: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        tags: ["dreams", "future", "belief"],
        length: 67,
      },
      {
        content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        tags: ["success", "courage", "perseverance"],
        length: 83,
      },
      {
        content: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        tags: ["journey", "beginning", "possibility"],
        length: 55,
      },
      {
        content: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
        tags: ["persistence", "action", "time"],
        length: 50,
      },
      {
        content: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        tags: ["action", "beginning", "achievement"],
        length: 57,
      },
    ],
    peaceful: [
      {
        content: "Peace comes from within. Do not seek it without.",
        author: "Buddha",
        tags: ["peace", "wisdom", "inner"],
        length: 47,
      },
      {
        content: "In the midst of winter, I found there was, within me, an invincible summer.",
        author: "Albert Camus",
        tags: ["peace", "strength", "resilience"],
        length: 74,
      },
      {
        content: "The present moment is the only time over which we have dominion.",
        author: "Thich Nhat Hanh",
        tags: ["mindfulness", "present", "peace"],
        length: 63,
      },
      {
        content: "Wherever you are, be there totally.",
        author: "Eckhart Tolle",
        tags: ["presence", "mindfulness", "peace"],
        length: 36,
      },
    ],
    creative: [
      {
        content: "Creativity takes courage.",
        author: "Henri Matisse",
        tags: ["creativity", "courage", "art"],
        length: 23,
      },
      {
        content: "The creative adult is the child who survived.",
        author: "Ursula K. Le Guin",
        tags: ["creativity", "childhood", "survival"],
        length: 43,
      },
      {
        content: "Imagination is more important than knowledge.",
        author: "Albert Einstein",
        tags: ["imagination", "creativity", "knowledge"],
        length: 44,
      },
      {
        content: "Every artist was first an amateur.",
        author: "Ralph Waldo Emerson",
        tags: ["art", "beginning", "growth"],
        length: 34,
      },
      {
        content: "The secret to creativity is knowing how to hide your sources.",
        author: "Pablo Picasso",
        tags: ["creativity", "originality", "art"],
        length: 59,
      },
    ],
    romantic: [
      {
        content: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
        author: "Lao Tzu",
        tags: ["love", "strength", "courage"],
        length: 93,
      },
      {
        content: "Love is composed of a single soul inhabiting two bodies.",
        author: "Aristotle",
        tags: ["love", "soul", "unity"],
        length: 55,
      },
      {
        content: "The best thing to hold onto in life is each other.",
        author: "Audrey Hepburn",
        tags: ["love", "relationships", "life"],
        length: 49,
      },
      {
        content: "Where there is love there is life.",
        author: "Mahatma Gandhi",
        tags: ["love", "life", "vitality"],
        length: 33,
      },
    ],
    energized: [
      {
        content: "Energy and persistence conquer all things.",
        author: "Benjamin Franklin",
        tags: ["energy", "persistence", "success"],
        length: 40,
      },
      {
        content: "The way I see it, if you want the rainbow, you gotta put up with the rain.",
        author: "Dolly Parton",
        tags: ["perseverance", "optimism", "energy"],
        length: 73,
      },
      {
        content: "Don't wait for opportunity. Create it.",
        author: "George Bernard Shaw",
        tags: ["opportunity", "action", "creation"],
        length: 37,
      },
    ],
    adventurous: [
      {
        content: "Adventure is worthwhile in itself.",
        author: "Amelia Earhart",
        tags: ["adventure", "courage", "exploration"],
        length: 34,
      },
      {
        content: "Life is either a daring adventure or nothing at all.",
        author: "Helen Keller",
        tags: ["adventure", "life", "courage"],
        length: 51,
      },
      {
        content: "The biggest adventure you can take is to live the life of your dreams.",
        author: "Oprah Winfrey",
        tags: ["adventure", "dreams", "life"],
        length: 69,
      },
    ],
  }

  const quotes = quotesByEmotion[emotion] || quotesByEmotion.happy

  // Add variety by mixing in quotes from related emotions
  const relatedEmotions = {
    happy: ["motivated", "creative"],
    sad: ["peaceful", "motivated"],
    motivated: ["happy", "adventurous"],
    peaceful: ["creative", "romantic"],
    creative: ["motivated", "adventurous"],
    romantic: ["happy", "peaceful"],
    energized: ["motivated", "adventurous"],
    adventurous: ["energized", "creative"],
  }

  let allQuotes = [...quotes]
  const related = relatedEmotions[emotion] || []

  related.forEach((relatedEmotion) => {
    if (quotesByEmotion[relatedEmotion]) {
      allQuotes = [...allQuotes, ...quotesByEmotion[relatedEmotion].slice(0, 2)]
    }
  })

  return allQuotes.slice(0, 8)
}
