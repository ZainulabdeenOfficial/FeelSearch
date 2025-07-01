import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    // Enhanced real-time emotion analysis
    const analysis = analyzeEmotionAdvanced(text)

    return NextResponse.json({
      emotion: analysis.primary,
      confidence: analysis.confidence,
      secondary: analysis.secondary,
      keywords: analysis.detectedKeywords,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Emotion analysis error:", error)
    return NextResponse.json(
      {
        emotion: "happy",
        confidence: 0.5,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  }
}

function analyzeEmotionAdvanced(text: string) {
  const lowerText = text.toLowerCase()

  // Enhanced emotion keywords with contextual weights
  const emotionKeywords = {
    happy: {
      keywords: [
        "happy",
        "joy",
        "excited",
        "cheerful",
        "delighted",
        "thrilled",
        "elated",
        "upbeat",
        "positive",
        "wonderful",
        "amazing",
        "fantastic",
        "great",
        "awesome",
        "brilliant",
        "celebrate",
        "celebration",
        "fun",
        "laugh",
        "smile",
        "bright",
        "sunshine",
      ],
      contextual: ["feel good", "on top of the world", "over the moon"],
      weight: 1,
    },
    sad: {
      keywords: [
        "sad",
        "depressed",
        "down",
        "melancholy",
        "blue",
        "gloomy",
        "sorrowful",
        "heartbroken",
        "disappointed",
        "upset",
        "crying",
        "tears",
        "lonely",
        "empty",
        "hurt",
        "pain",
        "grief",
        "loss",
        "miss",
        "regret",
      ],
      contextual: ["feeling down", "broken heart", "can't stop crying"],
      weight: 1,
    },
    anxious: {
      keywords: [
        "anxious",
        "worried",
        "stressed",
        "nervous",
        "panic",
        "fear",
        "scared",
        "overwhelmed",
        "tense",
        "restless",
        "uneasy",
        "concerned",
        "troubled",
        "anxiety",
        "stress",
        "worry",
        "tension",
        "pressure",
      ],
      contextual: ["can't relax", "mind racing", "heart pounding"],
      weight: 1,
    },
    peaceful: {
      keywords: [
        "peaceful",
        "calm",
        "serene",
        "tranquil",
        "relaxed",
        "zen",
        "quiet",
        "still",
        "centered",
        "balanced",
        "harmonious",
        "meditation",
        "mindful",
        "breathe",
      ],
      contextual: ["at peace", "inner calm", "feeling centered"],
      weight: 1,
    },
    energized: {
      keywords: [
        "energized",
        "pumped",
        "hyper",
        "active",
        "dynamic",
        "vigorous",
        "lively",
        "spirited",
        "charged",
        "motivated",
        "ready",
        "go",
        "action",
        "power",
      ],
      contextual: ["full of energy", "ready to go", "pumped up"],
      weight: 1,
    },
    nostalgic: {
      keywords: [
        "nostalgic",
        "memories",
        "past",
        "remember",
        "childhood",
        "vintage",
        "old times",
        "reminisce",
        "throwback",
        "sentimental",
        "miss",
        "used to",
        "back then",
      ],
      contextual: ["good old days", "takes me back", "remember when"],
      weight: 1,
    },
    creative: {
      keywords: [
        "creative",
        "artistic",
        "inspired",
        "imaginative",
        "innovative",
        "original",
        "inventive",
        "expressive",
        "design",
        "art",
        "create",
        "make",
        "build",
        "craft",
      ],
      contextual: ["creative flow", "artistic vision", "burst of inspiration"],
      weight: 1,
    },
    romantic: {
      keywords: [
        "romantic",
        "love",
        "affection",
        "tender",
        "intimate",
        "passionate",
        "devoted",
        "adoring",
        "caring",
        "sweet",
        "romance",
        "heart",
        "valentine",
        "date",
      ],
      contextual: ["in love", "head over heels", "romantic mood"],
      weight: 1,
    },
    adventurous: {
      keywords: [
        "adventurous",
        "explore",
        "travel",
        "discover",
        "journey",
        "expedition",
        "quest",
        "wanderlust",
        "bold",
        "daring",
        "adventure",
        "explore",
        "new",
        "unknown",
      ],
      contextual: ["ready for adventure", "explore the world", "new experiences"],
      weight: 1,
    },
    motivated: {
      keywords: [
        "motivated",
        "determined",
        "driven",
        "ambitious",
        "focused",
        "goal",
        "success",
        "achieve",
        "accomplish",
        "productive",
        "hustle",
        "grind",
        "push",
        "strive",
      ],
      contextual: ["ready to succeed", "goal oriented", "driven to achieve"],
      weight: 1,
    },
  }

  const scores = {}
  const detectedKeywords = []
  let totalMatches = 0

  // Calculate scores for each emotion
  Object.entries(emotionKeywords).forEach(([emotion, data]) => {
    let score = 0

    // Check individual keywords
    data.keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi")
      const matches = (lowerText.match(regex) || []).length
      if (matches > 0) {
        score += matches * data.weight
        detectedKeywords.push(keyword)
        totalMatches += matches
      }
    })

    // Check contextual phrases (higher weight)
    data.contextual?.forEach((phrase) => {
      if (lowerText.includes(phrase.toLowerCase())) {
        score += 2 * data.weight
        detectedKeywords.push(phrase)
        totalMatches += 1
      }
    })

    scores[emotion] = score
  })

  // Find primary and secondary emotions
  const sortedEmotions = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .filter(([, score]) => score > 0)

  if (sortedEmotions.length === 0) {
    return {
      primary: "happy",
      confidence: 0.3,
      secondary: null,
      detectedKeywords: [],
    }
  }

  const primary = sortedEmotions[0][0]
  const primaryScore = sortedEmotions[0][1]
  const secondary = sortedEmotions.length > 1 ? sortedEmotions[1][0] : null

  // Enhanced confidence calculation
  const textLength = text.split(" ").length
  const keywordDensity = totalMatches / Math.max(textLength, 1)
  const baseConfidence = Math.min(0.95, Math.max(0.3, primaryScore / Math.max(1, totalMatches)))
  const lengthBonus = Math.min(0.1, textLength / 100) // Bonus for longer, more detailed text
  const confidence = Math.min(0.95, baseConfidence + lengthBonus + keywordDensity * 0.1)

  return {
    primary,
    confidence,
    secondary,
    detectedKeywords: [...new Set(detectedKeywords)].slice(0, 5), // Remove duplicates, limit to 5
  }
}
