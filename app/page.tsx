"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Smile,
  Frown,
  Zap,
  Moon,
  Sun,
  Music,
  BookOpen,
  Video,
  Quote,
  TrendingUp,
  Shield,
  BarChart3,
  Sparkles,
  ArrowRight,
  Play,
  ExternalLink,
  Clock,
  User,
  AlertCircle,
  Loader2,
  Eye,
  Calendar,
  Globe,
  Headphones,
  Activity,
  CloudLightningIcon as Lightning,
  RefreshCw,
  Share2,
  Stars,
  ZapIcon,
  Camera,
  CameraOff,
  Trash2,
  Download,
  Lock,
  Unlock,
  UserCheck,
  Brain,
  Waves,
  Target,
  PieChart,
} from "lucide-react"

const emotions = [
  {
    id: "happy",
    label: "Happy",
    icon: Smile,
    color: "bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500",
    description: "Feeling joyful and upbeat",
    keywords: ["happy", "upbeat", "cheerful", "positive", "energetic", "joy", "celebration", "fun"],
    gradient: "from-yellow-50 via-orange-50 to-pink-50",
    shadow: "shadow-yellow-500/30",
    searchTerms: ["uplifting music", "feel good songs", "happy vibes", "positive energy"],
    darkGradient: "from-yellow-900/30 via-orange-900/30 to-pink-900/30",
    faceKeywords: ["smile", "joy", "happiness", "positive"],
  },
  {
    id: "sad",
    label: "Sad",
    icon: Frown,
    color: "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600",
    description: "Feeling down or melancholy",
    keywords: ["sad", "melancholy", "healing", "comfort", "emotional", "blues", "sorrow", "grief"],
    gradient: "from-blue-50 via-indigo-50 to-purple-50",
    shadow: "shadow-blue-500/30",
    searchTerms: ["sad songs", "emotional music", "healing", "comfort"],
    darkGradient: "from-blue-900/30 via-indigo-900/30 to-purple-900/30",
    faceKeywords: ["sadness", "sorrow", "melancholy", "down"],
  },
  {
    id: "anxious",
    label: "Anxious",
    icon: Zap,
    color: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-600",
    description: "Feeling worried or stressed",
    keywords: ["anxious", "calm", "relaxing", "meditation", "peaceful", "stress relief", "worry", "tension"],
    gradient: "from-orange-50 via-red-50 to-pink-50",
    shadow: "shadow-orange-500/30",
    searchTerms: ["calming music", "meditation", "stress relief", "anxiety help"],
    darkGradient: "from-orange-900/30 via-red-900/30 to-pink-900/30",
    faceKeywords: ["fear", "anxiety", "worry", "stress"],
  },
  {
    id: "surprised",
    label: "Surprised",
    icon: Eye,
    color: "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600",
    description: "Feeling amazed or shocked",
    keywords: ["surprised", "amazed", "shocked", "wonder", "astonished", "unexpected", "wow", "incredible"],
    gradient: "from-cyan-50 via-blue-50 to-indigo-50",
    shadow: "shadow-cyan-500/30",
    searchTerms: ["amazing content", "surprising facts", "incredible stories", "wow moments"],
    darkGradient: "from-cyan-900/30 via-blue-900/30 to-indigo-900/30",
    faceKeywords: ["surprise", "amazement", "shock", "wonder"],
  },
  {
    id: "angry",
    label: "Angry",
    icon: Zap,
    color: "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500",
    description: "Feeling frustrated or mad",
    keywords: ["angry", "frustrated", "mad", "annoyed", "irritated", "furious", "rage", "upset"],
    gradient: "from-red-50 via-orange-50 to-yellow-50",
    shadow: "shadow-red-500/30",
    searchTerms: ["calming content", "anger management", "peaceful music", "relaxation"],
    darkGradient: "from-red-900/30 via-orange-900/30 to-yellow-900/30",
    faceKeywords: ["anger", "rage", "fury", "mad"],
  },
  {
    id: "disgusted",
    label: "Disgusted",
    icon: Frown,
    color: "bg-gradient-to-br from-green-400 via-teal-500 to-cyan-600",
    description: "Feeling repulsed or revolted",
    keywords: ["disgusted", "repulsed", "revolted", "sick", "nauseated", "appalled", "horrified", "offended"],
    gradient: "from-green-50 via-teal-50 to-cyan-50",
    shadow: "shadow-green-500/30",
    searchTerms: ["cleansing content", "positive vibes", "uplifting music", "fresh perspective"],
    darkGradient: "from-green-900/30 via-teal-900/30 to-cyan-900/30",
    faceKeywords: ["disgust", "revulsion", "repulsion", "sick"],
  },
  {
    id: "nostalgic",
    label: "Nostalgic",
    icon: Clock,
    color: "bg-gradient-to-br from-purple-400 via-pink-500 to-rose-600",
    description: "Longing for the past",
    keywords: ["nostalgic", "vintage", "classic", "memories", "throwback", "retro", "old times", "reminisce"],
    gradient: "from-purple-50 via-pink-50 to-rose-50",
    shadow: "shadow-purple-500/30",
    searchTerms: ["classic songs", "vintage music", "throwback", "nostalgic"],
    darkGradient: "from-purple-900/30 via-pink-900/30 to-rose-900/30",
    faceKeywords: ["nostalgia", "memories", "past", "reminiscence"],
  },
  {
    id: "motivated",
    label: "Motivated",
    icon: TrendingUp,
    color: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600",
    description: "Ready to take action",
    keywords: ["motivated", "inspiring", "success", "productivity", "achievement", "goals", "determination", "drive"],
    gradient: "from-green-50 via-emerald-50 to-teal-50",
    shadow: "shadow-green-500/30",
    searchTerms: ["motivational music", "workout songs", "inspiring", "pump up"],
    darkGradient: "from-green-900/30 via-emerald-900/30 to-teal-900/30",
    faceKeywords: ["determination", "focus", "drive", "ambition"],
  },
  {
    id: "peaceful",
    label: "Peaceful",
    icon: Moon,
    color: "bg-gradient-to-br from-indigo-400 via-blue-500 to-cyan-600",
    description: "Calm and serene",
    keywords: ["peaceful", "zen", "nature", "ambient", "tranquil", "meditation", "serenity", "calm"],
    gradient: "from-indigo-50 via-blue-50 to-cyan-50",
    shadow: "shadow-indigo-500/30",
    searchTerms: ["peaceful music", "ambient sounds", "nature sounds", "zen"],
    darkGradient: "from-indigo-900/30 via-blue-900/30 to-cyan-900/30",
    faceKeywords: ["calm", "peace", "serenity", "tranquil"],
  },
  {
    id: "energized",
    label: "Energized",
    icon: Sun,
    color: "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600",
    description: "Full of energy and excitement",
    keywords: ["energized", "workout", "dance", "exciting", "pump up", "high energy", "dynamic", "active"],
    gradient: "from-amber-50 via-yellow-50 to-orange-50",
    shadow: "shadow-amber-500/30",
    searchTerms: ["high energy music", "workout playlist", "dance music", "pump up songs"],
    darkGradient: "from-amber-900/30 via-yellow-900/30 to-orange-900/30",
    faceKeywords: ["energy", "excitement", "vigor", "enthusiasm"],
  },
]

export default function FeelSearch() {
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [customEmotion, setCustomEmotion] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [privacyMode, setPrivacyMode] = useState(true)
  const [showEmoGraph, setShowEmoGraph] = useState(false)
  const [emotionHistory, setEmotionHistory] = useState([])
  const [error, setError] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [lastSearchTime, setLastSearchTime] = useState(null)
  const [emotionConfidence, setEmotionConfidence] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Face Recognition States
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isDetectingEmotion, setIsDetectingEmotion] = useState(false)
  const [faceEmotionData, setFaceEmotionData] = useState(null)
  const [cameraPermission, setCameraPermission] = useState(null)
  const [faceDetectionEnabled, setFaceDetectionEnabled] = useState(false)
  const [autoSearchEnabled, setAutoSearchEnabled] = useState(true) // Enable by default
  const [facePrivacyMode, setFacePrivacyMode] = useState(true)
  const [detectionInterval, setDetectionInterval] = useState(1500) // Faster detection - 1.5 seconds
  const [lastFaceDetection, setLastFaceDetection] = useState(null)
  const [faceDetectionHistory, setFaceDetectionHistory] = useState([])
  const [streamQuality, setStreamQuality] = useState("medium")
  const [videoLoaded, setVideoLoaded] = useState(false)

  // New states for overall emotion analysis
  const [overallEmotionAnalysis, setOverallEmotionAnalysis] = useState(null)
  const [emotionTrends, setEmotionTrends] = useState({})
  const [realtimeEmotions, setRealtimeEmotions] = useState([])

  // Refs
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const detectionIntervalRef = useRef(null)
  const faceApiRef = useRef(null)

  // Load preferences from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load emotion history
      const savedHistory = localStorage.getItem("feelsearch-history")
      if (savedHistory) {
        try {
          setEmotionHistory(JSON.parse(savedHistory))
        } catch (e) {
          console.error("Failed to parse saved history")
        }
      }

      // Load face detection history
      const savedFaceHistory = localStorage.getItem("feelsearch-face-history")
      if (savedFaceHistory && !facePrivacyMode) {
        try {
          setFaceDetectionHistory(JSON.parse(savedFaceHistory))
        } catch (e) {
          console.error("Failed to parse saved face history")
        }
      }

      // Load dark mode preference
      const savedDarkMode = localStorage.getItem("feelsearch-darkmode")
      if (savedDarkMode) {
        setIsDarkMode(JSON.parse(savedDarkMode))
      } else {
        // Check system preference
        setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)
      }

      // Load face detection preferences
      const savedFacePrivacy = localStorage.getItem("feelsearch-face-privacy")
      if (savedFacePrivacy) {
        setFacePrivacyMode(JSON.parse(savedFacePrivacy))
      }

      const savedAutoSearch = localStorage.getItem("feelsearch-auto-search")
      if (savedAutoSearch) {
        setAutoSearchEnabled(JSON.parse(savedAutoSearch))
      }

      const savedDetectionInterval = localStorage.getItem("feelsearch-detection-interval")
      if (savedDetectionInterval) {
        setDetectionInterval(JSON.parse(savedDetectionInterval))
      }

      const savedStreamQuality = localStorage.getItem("feelsearch-stream-quality")
      if (savedStreamQuality) {
        setStreamQuality(savedStreamQuality)
      }
    }
  }, [facePrivacyMode])

  // Apply dark mode to document
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [isDarkMode])

  // Initialize Face API
  useEffect(() => {
    const loadFaceAPI = async () => {
      try {
        // Simulate face API loading (in real implementation, you'd load face-api.js or similar)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        faceApiRef.current = {
          detectEmotions: mockDetectEmotions,
          isLoaded: true,
        }
      } catch (error) {
        console.error("Failed to load Face API:", error)
      }
    }

    loadFaceAPI()
  }, [])

  // Enhanced mock face emotion detection with more realistic patterns
  const mockDetectEmotions = useCallback(
    (imageData) => {
      // Create more realistic emotion patterns based on time and previous detections
      const now = Date.now()
      const timeOfDay = new Date().getHours()

      // Base emotions with realistic distributions
      const emotionScores = {
        happy: Math.random() * 0.4 + 0.1,
        sad: Math.random() * 0.2 + 0.05,
        angry: Math.random() * 0.15 + 0.02,
        surprised: Math.random() * 0.25 + 0.05,
        anxious: Math.random() * 0.3 + 0.1,
        disgusted: Math.random() * 0.1 + 0.01,
        peaceful: Math.random() * 0.35 + 0.15,
        energized: Math.random() * 0.3 + 0.1,
        motivated: Math.random() * 0.25 + 0.1,
        nostalgic: Math.random() * 0.2 + 0.05,
      }

      // Adjust based on time of day for more realism
      if (timeOfDay >= 6 && timeOfDay <= 10) {
        // Morning - more energized and motivated
        emotionScores.energized += 0.2
        emotionScores.motivated += 0.15
        emotionScores.peaceful += 0.1
      } else if (timeOfDay >= 11 && timeOfDay <= 17) {
        // Afternoon - more focused and happy
        emotionScores.happy += 0.15
        emotionScores.motivated += 0.1
      } else if (timeOfDay >= 18 && timeOfDay <= 22) {
        // Evening - more relaxed
        emotionScores.peaceful += 0.2
        emotionScores.happy += 0.1
      } else {
        // Night - more contemplative
        emotionScores.peaceful += 0.25
        emotionScores.nostalgic += 0.15
      }

      // Add some continuity with previous detections
      if (faceEmotionData && Math.random() > 0.3) {
        const prevEmotion = faceEmotionData.dominantEmotion
        if (emotionScores[prevEmotion]) {
          emotionScores[prevEmotion] += 0.1 // Slight bias towards previous emotion
        }
      }

      // Normalize scores to ensure they don't exceed 1
      Object.keys(emotionScores).forEach((emotion) => {
        emotionScores[emotion] = Math.min(emotionScores[emotion], 0.95)
      })

      // Find dominant emotion
      const dominantEmotion = Object.entries(emotionScores).reduce((a, b) =>
        emotionScores[a[0]] > emotionScores[b[0]] ? a : b,
      )

      // Calculate overall confidence based on how distinct the dominant emotion is
      const sortedScores = Object.values(emotionScores).sort((a, b) => b - a)
      const confidence = Math.min(0.95, dominantEmotion[1] + (sortedScores[0] - sortedScores[1]) * 0.5)

      return {
        emotions: emotionScores,
        dominantEmotion: dominantEmotion[0],
        confidence: confidence,
        timestamp: new Date().toISOString(),
        faceDetected: Math.random() > 0.05, // 95% chance of face detection
        rawData: {
          imageWidth: imageData?.width || 640,
          imageHeight: imageData?.height || 480,
          processingTime: Math.random() * 50 + 20, // 20-70ms
        },
      }
    },
    [faceEmotionData],
  )

  // Calculate overall emotion analysis from recent detections
  const calculateOverallAnalysis = useCallback((recentDetections) => {
    if (recentDetections.length === 0) return null

    const emotionTotals = {}
    const emotionCounts = {}
    let totalConfidence = 0
    const totalDetections = recentDetections.length

    // Aggregate all emotions from recent detections
    recentDetections.forEach((detection) => {
      Object.entries(detection.emotions).forEach(([emotion, score]) => {
        if (!emotionTotals[emotion]) {
          emotionTotals[emotion] = 0
          emotionCounts[emotion] = 0
        }
        emotionTotals[emotion] += score
        emotionCounts[emotion] += 1
      })
      totalConfidence += detection.confidence
    })

    // Calculate averages
    const emotionAverages = {}
    Object.keys(emotionTotals).forEach((emotion) => {
      emotionAverages[emotion] = emotionTotals[emotion] / emotionCounts[emotion]
    })

    // Find dominant overall emotion
    const dominantOverall = Object.entries(emotionAverages).reduce((a, b) =>
      emotionAverages[a[0]] > emotionAverages[b[0]] ? a : b,
    )

    // Calculate trends (increasing/decreasing emotions)
    const trends = {}
    if (recentDetections.length >= 3) {
      const recent = recentDetections.slice(0, Math.floor(recentDetections.length / 2))
      const older = recentDetections.slice(Math.floor(recentDetections.length / 2))

      Object.keys(emotionAverages).forEach((emotion) => {
        const recentAvg = recent.reduce((sum, d) => sum + (d.emotions[emotion] || 0), 0) / recent.length
        const olderAvg = older.reduce((sum, d) => sum + (d.emotions[emotion] || 0), 0) / older.length
        trends[emotion] = recentAvg - olderAvg
      })
    }

    return {
      dominantEmotion: dominantOverall[0],
      dominantScore: dominantOverall[1],
      averageConfidence: totalConfidence / totalDetections,
      emotionBreakdown: emotionAverages,
      trends: trends,
      totalDetections: totalDetections,
      timeSpan: {
        start: recentDetections[recentDetections.length - 1]?.timestamp,
        end: recentDetections[0]?.timestamp,
      },
    }
  }, [])

  // Request camera permission with optimized settings
  const requestCameraPermission = async () => {
    try {
      setError("")

      const constraints = {
        video: {
          width: { ideal: streamQuality === "high" ? 1280 : streamQuality === "medium" ? 640 : 320 },
          height: { ideal: streamQuality === "high" ? 720 : streamQuality === "medium" ? 480 : 240 },
          facingMode: "user",
          frameRate: { ideal: 15, max: 30 },
        },
      }

      console.log("Requesting camera access...")
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      setCameraPermission("granted")

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.muted = true
        videoRef.current.playsInline = true
        videoRef.current.autoplay = true

        const handleLoadedData = () => {
          console.log("Video data loaded")
          setVideoLoaded(true)
        }

        const handleCanPlay = () => {
          console.log("Video can play")
          setVideoLoaded(true)
        }

        videoRef.current.addEventListener("loadeddata", handleLoadedData)
        videoRef.current.addEventListener("canplay", handleCanPlay)

        try {
          await videoRef.current.play()
          console.log("Video playing successfully")
        } catch (playError) {
          console.warn("Autoplay failed, but video is ready:", playError)
          setVideoLoaded(true)
        }
      }

      return true
    } catch (error) {
      console.error("Camera permission denied:", error)
      setCameraPermission("denied")

      if (error.name === "NotAllowedError") {
        setError("Camera access denied. Please allow camera permissions and refresh the page.")
      } else if (error.name === "NotFoundError") {
        setError("No camera found. Please connect a camera and try again.")
      } else if (error.name === "NotReadableError") {
        setError("Camera is being used by another application. Please close other apps and try again.")
      } else {
        setError("Failed to access camera. Please check your camera settings and try again.")
      }

      return false
    }
  }

  // Stop camera stream
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCameraActive(false)
    setIsDetectingEmotion(false)
    setVideoLoaded(false)
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
      detectionIntervalRef.current = null
    }
  }

  // Start camera and face detection with optimized timing
  const startFaceDetection = async () => {
    if (!faceApiRef.current?.isLoaded) {
      setError("Face detection API is still loading. Please try again in a moment.")
      return
    }

    setIsCameraActive(true)
    setFaceDetectionEnabled(true)
    setError("")

    const hasPermission = await requestCameraPermission()
    if (!hasPermission) {
      setIsCameraActive(false)
      setFaceDetectionEnabled(false)
      return
    }

    // Start detection immediately when video is ready
    const startDetectionWhenReady = () => {
      if (videoRef.current && videoLoaded && faceApiRef.current) {
        console.log("Starting face detection interval")
        detectionIntervalRef.current = setInterval(() => {
          if (videoRef.current && canvasRef.current && faceApiRef.current && videoLoaded) {
            detectFaceEmotionOptimized()
          }
        }, detectionInterval)
      } else {
        setTimeout(startDetectionWhenReady, 100)
      }
    }

    setTimeout(startDetectionWhenReady, 200)
  }

  // Stop face detection
  const stopFaceDetection = () => {
    stopCameraStream()
    setFaceDetectionEnabled(false)
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
      detectionIntervalRef.current = null
    }
  }

  // Optimized face emotion detection with better performance
  const detectFaceEmotionOptimized = async () => {
    if (!videoRef.current || !canvasRef.current || !faceApiRef.current || !videoLoaded) {
      return
    }

    const { videoWidth, videoHeight } = videoRef.current
    if (videoWidth === 0 || videoHeight === 0) {
      return
    }

    try {
      setIsDetectingEmotion(true)

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d", { alpha: false })

      const scale = 0.5
      canvas.width = videoWidth * scale
      canvas.height = videoHeight * scale

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const emotionResult = faceApiRef.current.detectEmotions(imageData)

      if (emotionResult.faceDetected) {
        console.log(
          `🎭 Emotion detected: ${emotionResult.dominantEmotion} (${Math.round(emotionResult.confidence * 100)}%)`,
        )

        setFaceEmotionData(emotionResult)
        setLastFaceDetection(new Date().toISOString())

        // Add to realtime emotions array (keep last 20 detections)
        setRealtimeEmotions((prev) => {
          const updated = [emotionResult, ...prev.slice(0, 19)]

          // Calculate overall analysis from recent detections
          const analysis = calculateOverallAnalysis(updated.slice(0, 10)) // Use last 10 detections
          setOverallEmotionAnalysis(analysis)

          return updated
        })

        // Save to history if privacy mode is off
        if (!facePrivacyMode) {
          const newEntry = {
            ...emotionResult,
            id: Date.now(),
          }
          const updatedHistory = [newEntry, ...faceDetectionHistory.slice(0, 49)]
          setFaceDetectionHistory(updatedHistory)
          localStorage.setItem("feelsearch-face-history", JSON.stringify(updatedHistory))
        }

        // Auto-search if enabled and confidence is high enough
        if (autoSearchEnabled && emotionResult.confidence > 0.4) {
          // Lowered threshold from 0.5 to 0.4
          const detectedEmotion = emotions.find((e) => e.id === emotionResult.dominantEmotion)
          if (detectedEmotion) {
            // Always trigger search for face-detected emotions, don't check if it's the same as selected
            console.log(`Auto-searching for detected emotion: ${detectedEmotion.label}`)
            await handleEmotionSelect(detectedEmotion, true)
          }
        }
      }
    } catch (error) {
      console.error("Face emotion detection failed:", error)
    } finally {
      setIsDetectingEmotion(false)
    }
  }

  // Clear face detection history
  const clearFaceHistory = () => {
    setFaceDetectionHistory([])
    setRealtimeEmotions([])
    setOverallEmotionAnalysis(null)
    localStorage.removeItem("feelsearch-face-history")
  }

  // Export face detection data
  const exportFaceData = () => {
    const data = {
      history: faceDetectionHistory,
      realtimeEmotions: realtimeEmotions,
      overallAnalysis: overallEmotionAnalysis,
      exportDate: new Date().toISOString(),
      totalDetections: faceDetectionHistory.length,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `feelsearch-face-data-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Save preferences
  const saveFacePreferences = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("feelsearch-face-privacy", JSON.stringify(facePrivacyMode))
      localStorage.setItem("feelsearch-auto-search", JSON.stringify(autoSearchEnabled))
      localStorage.setItem("feelsearch-detection-interval", JSON.stringify(detectionInterval))
      localStorage.setItem("feelsearch-stream-quality", streamQuality)
    }
  }

  // Save emotion history to localStorage
  const saveToHistory = (emotion, query, confidence = 0, isFaceDetected = false) => {
    if (!privacyMode) return

    const newEntry = {
      emotion: emotion.id,
      query,
      timestamp: new Date().toISOString(),
      content: `${emotion.label} search`,
      confidence: Math.round(confidence * 100),
      source: isFaceDetected ? "face-detection" : "manual",
    }

    const updated = [newEntry, ...emotionHistory.slice(0, 9)]
    setEmotionHistory(updated)

    if (typeof window !== "undefined") {
      localStorage.setItem("feelsearch-history", JSON.stringify(updated))
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    if (typeof window !== "undefined") {
      localStorage.setItem("feelsearch-darkmode", JSON.stringify(newDarkMode))
    }
  }

  const analyzeEmotionWithAI = async (text) => {
    try {
      setIsAnalyzing(true)
      const response = await fetch("/api/analyze-emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) throw new Error("Failed to analyze emotion")

      const data = await response.json()
      setEmotionConfidence(data.confidence || 0.8)
      return data.emotion
    } catch (error) {
      console.error("Emotion analysis failed:", error)
      return detectEmotionFromText(text)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const detectEmotionFromText = (text) => {
    const lowerText = text.toLowerCase()
    let maxScore = 0
    let detectedEmotion = "happy"

    emotions.forEach((emotion) => {
      let score = 0
      emotion.keywords.forEach((keyword) => {
        if (lowerText.includes(keyword)) {
          score += keyword.length
        }
      })
      if (score > maxScore) {
        maxScore = score
        detectedEmotion = emotion.id
      }
    })

    setEmotionConfidence(maxScore > 0 ? 0.7 : 0.3)
    return detectedEmotion
  }

  const searchContent = async (emotion, customQuery = "") => {
    try {
      setError("")
      setSearchProgress(0)
      setLastSearchTime(new Date().toISOString())

      const searchTerms = customQuery ? [customQuery] : [...emotion.searchTerms, ...emotion.keywords.slice(0, 3)]
      const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)]

      const searchPromises = [
        fetch("/api/search/music", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: randomTerm, emotion: emotion.id, timestamp: Date.now() }),
        }).then((res) => res.json()),

        fetch("/api/search/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: randomTerm, emotion: emotion.id, timestamp: Date.now() }),
        }).then((res) => res.json()),

        fetch("/api/search/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: randomTerm, emotion: emotion.id, timestamp: Date.now() }),
        }).then((res) => res.json()),

        fetch("/api/search/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: randomTerm, emotion: emotion.id, timestamp: Date.now() }),
        }).then((res) => res.json()),
      ]

      const results = []
      for (let i = 0; i < searchPromises.length; i++) {
        try {
          const result = await searchPromises[i]
          setSearchProgress(((i + 1) / searchPromises.length) * 100)
          results.push(result)
        } catch (error) {
          console.error(`Search ${i} failed:`, error)
          results.push({ error: true })
        }
      }

      const [musicResults, videoResults, newsResults, quotesResults] = results
      const allResults = []

      // Process results (same as before)
      if (musicResults.tracks?.length > 0) {
        allResults.push(
          ...musicResults.tracks.slice(0, 4).map((track) => ({
            type: "music",
            title: track.name || track.title,
            source: track.artists?.[0]?.name || track.artist || "Unknown Artist",
            duration: track.duration || "3:30",
            url:
              track.external_urls?.spotify ||
              track.url ||
              `https://open.spotify.com/search/${encodeURIComponent(track.name || track.title)}`,
            icon: Music,
            image: track.album?.images?.[0]?.url || track.image || "/placeholder.svg?height=80&width=80",
            stats: {
              plays: track.popularity ? `${track.popularity}% popularity` : track.playcount || null,
            },
          })),
        )
      }

      if (videoResults.items?.length > 0) {
        allResults.push(
          ...videoResults.items.slice(0, 4).map((video) => ({
            type: "video",
            title: video.snippet?.title || video.title,
            source: video.snippet?.channelTitle || video.channel || "YouTube",
            duration: formatDuration(video.contentDetails?.duration) || video.duration || "5:30",
            url: video.id?.videoId
              ? `https://www.youtube.com/watch?v=${video.id.videoId}`
              : video.url ||
                `https://www.youtube.com/results?search_query=${encodeURIComponent(video.snippet?.title || video.title)}`,
            icon: Video,
            image: video.snippet?.thumbnails?.medium?.url || video.thumbnail || "/placeholder.svg?height=80&width=80",
            stats: {
              views: video.statistics?.viewCount
                ? formatNumber(video.statistics.viewCount) + " views"
                : video.views || null,
              date: video.snippet?.publishedAt ? new Date(video.snippet.publishedAt).toLocaleDateString() : null,
            },
          })),
        )
      }

      if (newsResults.articles?.length > 0) {
        allResults.push(
          ...newsResults.articles
            .filter((article) => article.title && article.title !== "[Removed]" && article.url)
            .slice(0, 3)
            .map((article) => ({
              type: "article",
              title: article.title,
              source: article.source?.name || article.source || "News Source",
              readTime: `${Math.ceil((article.content?.length || 1000) / 200)} min read`,
              url: article.url,
              icon: BookOpen,
              image: article.urlToImage || article.image || "/placeholder.svg?height=80&width=80",
              stats: {
                date: article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString()
                  : new Date().toLocaleDateString(),
              },
            })),
        )
      }

      if (quotesResults.quotes?.length > 0) {
        allResults.push(
          ...quotesResults.quotes.slice(0, 2).map((quote) => ({
            type: "quote",
            title: `"${quote.content || quote.text}"`,
            source: quote.author,
            url: null,
            icon: Quote,
            stats: {
              category: quote.tags?.[0] || "Inspirational",
            },
          })),
        )
      }

      return shuffleArray(allResults)
    } catch (error) {
      console.error("Search failed:", error)
      throw error
    }
  }

  const formatDuration = (duration) => {
    if (!duration) return null
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
    if (!match) return null

    const hours = Number.parseInt(match[1]) || 0
    const minutes = Number.parseInt(match[2]) || 0
    const seconds = Number.parseInt(match[3]) || 0

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B"
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleEmotionSelect = async (emotion, isFaceDetected = false) => {
    // Don't prevent search if it's face-detected, even if it's the same emotion
    if (!isFaceDetected && selectedEmotion?.id === emotion.id && searchResults.length > 0) {
      return // Skip if manually selecting same emotion and we already have results
    }

    setSelectedEmotion(emotion)
    setIsSearching(true)
    setError("")
    setSearchProgress(0)

    try {
      const results = await searchContent(emotion)
      setSearchResults(results)
      saveToHistory(emotion, emotion.label, 0.9, isFaceDetected)

      // Show success message for face-detected searches
      if (isFaceDetected) {
        console.log(`✅ Found ${results.length} results for detected emotion: ${emotion.label}`)
      }
    } catch (error) {
      setError("Failed to fetch real-time content. Please try again.")
      setSearchResults([])
    } finally {
      setIsSearching(false)
      setSearchProgress(100)
    }
  }

  const handleCustomSearch = async () => {
    if (!customEmotion.trim()) return

    setIsSearching(true)
    setError("")
    setSearchProgress(0)

    try {
      const analyzedEmotion = await analyzeEmotionWithAI(customEmotion)
      const emotion = emotions.find((e) => e.id === analyzedEmotion) || emotions[0]

      setSelectedEmotion(emotion)
      const results = await searchContent(emotion, customEmotion)
      setSearchResults(results)
      saveToHistory(emotion, customEmotion, emotionConfidence)
    } catch (error) {
      setError("Failed to process your request. Please try again.")
      setSearchResults([])
    } finally {
      setIsSearching(false)
      setSearchProgress(100)
    }
  }

  const refreshResults = async () => {
    if (selectedEmotion && !isSearching) {
      await handleEmotionSelect(selectedEmotion)
    }
  }

  const getEmotionTheme = (emotion) => {
    if (!emotion) {
      return isDarkMode
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        : "bg-gradient-to-br from-slate-50 to-slate-100"
    }

    if (isDarkMode) {
      return `bg-gradient-to-br ${emotion.darkGradient} dark:from-slate-900 dark:to-slate-800`
    }

    return `bg-gradient-to-br ${emotion.gradient}`
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now - time) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCameraStream()
    }
  }, [])

  // Save preferences when they change
  useEffect(() => {
    saveFacePreferences()
  }, [facePrivacyMode, autoSearchEnabled, detectionInterval, streamQuality])

  // Update detection interval when it changes
  useEffect(() => {
    if (detectionIntervalRef.current && faceDetectionEnabled) {
      clearInterval(detectionIntervalRef.current)
      detectionIntervalRef.current = setInterval(() => {
        if (videoRef.current && canvasRef.current && faceApiRef.current && videoLoaded) {
          detectFaceEmotionOptimized()
        }
      }, detectionInterval)
    }
  }, [detectionInterval, faceDetectionEnabled, videoLoaded])

  // Preload camera capabilities for faster access
  useEffect(() => {
    const preloadCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const hasCamera = devices.some((device) => device.kind === "videoinput")

        if (!hasCamera) {
          console.warn("No camera detected")
        } else {
          console.log("Camera detected, ready for use")
        }
      } catch (error) {
        console.warn("Could not enumerate devices:", error)
      }
    }

    if (typeof window !== "undefined" && navigator.mediaDevices) {
      preloadCamera()
    }
  }, [])

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${isDarkMode ? "dark" : ""} ${getEmotionTheme(selectedEmotion)}`}
    >
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300 dark:bg-yellow-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-pink-300 dark:bg-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-300 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-15 animate-blob animation-delay-6000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-green-300 dark:bg-green-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 animate-blob animation-delay-8000"></div>
      </div>

      {/* Enhanced Header with Face Detection Controls */}
      <header className="border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 shadow-xl border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 animate-pulse-glow">
                  <Heart className="w-9 h-9 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full animate-ping">
                  <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                {isCameraActive && (
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-pulse">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent animate-gradient">
                  FeelSearch
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span>Real-Time AI Emotion Discovery</span>
                  <Stars className="w-4 h-4 text-yellow-500 animate-pulse" />
                  {isCameraActive && (
                    <>
                      <Camera className="w-4 h-4 text-red-500 animate-pulse" />
                      <span className="text-red-600 dark:text-red-400">Face Detection Active</span>
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <Badge
                  variant="secondary"
                  className="text-xs animate-bounce bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700"
                >
                  🔴 LIVE DATA
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-xs animate-pulse bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                >
                  🤖 AI POWERED
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-xs animate-pulse animation-delay-200 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                >
                  📷 FACE DETECTION
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-slate-200 dark:border-slate-700">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                <Label htmlFor="privacy" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Privacy Mode
                </Label>
                <Switch id="privacy" checked={privacyMode} onCheckedChange={setPrivacyMode} />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEmoGraph(!showEmoGraph)}
                className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                EmoGraph
              </Button>
              {selectedEmotion && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshResults}
                  disabled={isSearching}
                  className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isSearching ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700"
              >
                {isDarkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {isDarkMode ? "Light" : "Dark"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Hero Section */}
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-responsive-4xl font-black mb-8 bg-gradient-to-r from-slate-800 via-purple-600 via-pink-600 to-slate-800 dark:from-slate-200 dark:via-purple-400 dark:via-pink-400 dark:to-slate-200 bg-clip-text text-transparent animate-gradient leading-tight">
              Search by how you feel
            </h2>
            <p className="text-responsive-xl text-slate-700 dark:text-slate-300 mb-12 max-w-5xl mx-auto leading-relaxed font-light">
              Express your emotions through
              <span className="font-bold text-purple-600 dark:text-purple-400 animate-pulse">
                {" "}
                text, voice, or face detection{" "}
              </span>
              and discover live, real-time content from across the web.
              <br />
              <span className="text-lg text-slate-600 dark:text-slate-400 flex items-center justify-center space-x-2 mt-2">
                <Brain className="w-5 h-5 text-blue-500 animate-pulse" />
                <span>Advanced AI emotion analysis with facial recognition • Privacy-first approach</span>
                <Camera className="w-5 h-5 text-green-500 animate-bounce" />
              </span>
            </p>
            <div className="flex justify-center flex-wrap gap-6 text-sm mb-8">
              <Badge
                variant="outline"
                className="px-6 py-3 animate-pulse bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:scale-105 transition-transform duration-300"
              >
                🎵 Live Spotify & Apple Music
              </Badge>
              <Badge
                variant="outline"
                className="px-6 py-3 animate-pulse animation-delay-200 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:scale-105 transition-transform duration-300"
              >
                📺 Real YouTube Videos
              </Badge>
              <Badge
                variant="outline"
                className="px-6 py-3 animate-pulse animation-delay-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:scale-105 transition-transform duration-300"
              >
                📰 Fresh News Articles
              </Badge>
              <Badge
                variant="outline"
                className="px-6 py-3 animate-pulse animation-delay-600 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:scale-105 transition-transform duration-300"
              >
                📷 Face Emotion Detection
              </Badge>
            </div>
            {lastSearchTime && (
              <p className="text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block border border-slate-200 dark:border-slate-700">
                Last updated: {new Date(lastSearchTime).toLocaleTimeString()}
              </p>
            )}
          </div>

          {/* Face Detection Panel */}
          <Card className="mb-12 shadow-4xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md hover:shadow-4xl transition-all duration-700 transform hover:-translate-y-2 card-hover border border-slate-200/50 dark:border-slate-700/50">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center space-x-4 text-responsive-2xl">
                <Camera className="w-10 h-10 text-blue-500 dark:text-blue-400 animate-pulse" />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Face Emotion Detection
                </span>
                {isCameraActive && (
                  <Badge className="bg-red-500 text-white animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                    LIVE
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 dark:text-slate-300 mt-4">
                Use your camera to detect emotions in real-time and automatically discover matching content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Camera Feed */}
                <div className="space-y-6">
                  <div className="relative">
                    <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-slate-700 shadow-2xl">
                      {isCameraActive ? (
                        <>
                          <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            onLoadedMetadata={() => {
                              console.log("Video metadata loaded")
                              setVideoLoaded(true)
                            }}
                            onCanPlay={() => {
                              console.log("Video can play")
                              setVideoLoaded(true)
                            }}
                          />

                          {/* Real-time emotion overlay on camera feed */}
                          {faceEmotionData && videoLoaded && (
                            <div className="absolute inset-0 pointer-events-none">
                              {/* Current emotion indicator */}
                              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-2xl">
                                <div className="flex items-center space-x-2">
                                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="font-bold text-lg capitalize">
                                    {faceEmotionData.dominantEmotion}
                                  </span>
                                  <span className="text-sm opacity-80">
                                    {Math.round(faceEmotionData.confidence * 100)}%
                                  </span>
                                </div>
                              </div>

                              {/* Emotion bars overlay */}
                              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-2xl min-w-[200px]">
                                <div className="text-xs font-bold mb-2 text-center">Live Emotions</div>
                                {Object.entries(faceEmotionData.emotions)
                                  .sort(([, a], [, b]) => b - a)
                                  .slice(0, 4)
                                  .map(([emotion, score]) => (
                                    <div key={emotion} className="flex items-center space-x-2 mb-1">
                                      <span className="text-xs capitalize w-16 truncate">{emotion}</span>
                                      <div className="flex-1 bg-white/20 rounded-full h-1.5">
                                        <div
                                          className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1.5 rounded-full transition-all duration-500"
                                          style={{ width: `${score * 100}%` }}
                                        ></div>
                                      </div>
                                      <span className="text-xs w-8">{Math.round(score * 100)}%</span>
                                    </div>
                                  ))}
                              </div>

                              {/* Detection status */}
                              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                {isDetectingEmotion ? (
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span>Analyzing...</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Ready</span>
                                  </div>
                                )}
                              </div>

                              {/* Face detection indicator */}
                              {faceEmotionData.faceDetected && (
                                <div className="absolute bottom-4 right-4 bg-green-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                  <div className="flex items-center space-x-2">
                                    <Target className="w-3 h-3" />
                                    <span>Face Detected</span>
                                  </div>
                                </div>
                              )}

                              {/* Auto-search status */}
                              {autoSearchEnabled && faceEmotionData && (
                                <div className="absolute bottom-4 center-4 bg-green-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                  <div className="flex items-center space-x-2">
                                    <Lightning className="w-3 h-3 animate-pulse" />
                                    <span>Auto-searching...</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <Camera className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                            <p className="text-slate-600 dark:text-slate-400 text-lg">Camera feed will appear here</p>
                            <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
                              Click "Start Detection" to begin
                            </p>
                          </div>
                        </div>
                      )}
                      {isCameraActive && !videoLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-center">
                            <div className="relative">
                              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                              <Camera className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <p className="text-slate-800 dark:text-slate-200 font-medium text-lg mb-2">
                              Initializing Camera...
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">This may take a few seconds</p>
                            <div className="mt-4 flex items-center justify-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-400"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                  </div>

                  {/* Camera Controls */}
                  <div className="flex flex-wrap gap-4">
                    {!isCameraActive ? (
                      <Button
                        onClick={startFaceDetection}
                        className="btn-gradient text-white border-0 px-8 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl"
                        disabled={cameraPermission === "denied"}
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Start Detection
                      </Button>
                    ) : (
                      <Button
                        onClick={stopFaceDetection}
                        variant="destructive"
                        className="px-8 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl"
                      >
                        <CameraOff className="w-5 h-5 mr-2" />
                        Stop Detection
                      </Button>
                    )}

                    {cameraPermission === "denied" && (
                      <Alert className="flex-1 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-red-700 dark:text-red-300">
                          Camera access denied. Please enable camera permissions in your browser settings.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                {/* Detection Results & Overall Analysis */}
                <div className="space-y-6">
                  {/* Overall Emotion Analysis */}
                  {overallEmotionAnalysis && (
                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          <span>Overall Emotion Analysis</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                              <Brain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-xl capitalize text-slate-800 dark:text-slate-200">
                                {overallEmotionAnalysis.dominantEmotion}
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Overall Confidence: {Math.round(overallEmotionAnalysis.averageConfidence * 100)}%
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-500">
                                Based on {overallEmotionAnalysis.totalDetections} detections
                              </div>
                            </div>
                          </div>

                          {/* Overall Emotion Breakdown */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Emotion Distribution:</Label>
                            {Object.entries(overallEmotionAnalysis.emotionBreakdown)
                              .sort(([, a], [, b]) => b - a)
                              .slice(0, 5)
                              .map(([emotion, score]) => (
                                <div key={emotion} className="flex items-center space-x-2">
                                  <span className="text-sm capitalize w-20">{emotion}:</span>
                                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                      style={{ width: `${score * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-slate-500 w-12">{Math.round(score * 100)}%</span>
                                </div>
                              ))}
                          </div>

                          {/* Emotion Trends */}
                          {Object.keys(overallEmotionAnalysis.trends).length > 0 && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Recent Trends:</Label>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(overallEmotionAnalysis.trends)
                                  .filter(([, trend]) => Math.abs(trend) > 0.05)
                                  .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
                                  .slice(0, 4)
                                  .map(([emotion, trend]) => (
                                    <Badge
                                      key={emotion}
                                      variant="outline"
                                      className={`text-xs ${
                                        trend > 0
                                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
                                          : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700"
                                      }`}
                                    >
                                      {emotion} {trend > 0 ? "↗" : "↘"} {Math.abs(Math.round(trend * 100))}%
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Current Emotion Detection */}
                  {faceEmotionData && (
                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-700">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span>Current Detection</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                              <UserCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-xl capitalize text-slate-800 dark:text-slate-200">
                                {faceEmotionData.dominantEmotion}
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Confidence: {Math.round(faceEmotionData.confidence * 100)}%
                              </div>
                            </div>
                          </div>

                          {/* Current Emotion Breakdown */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Current Breakdown:</Label>
                            {Object.entries(faceEmotionData.emotions)
                              .sort(([, a], [, b]) => b - a)
                              .slice(0, 5)
                              .map(([emotion, score]) => (
                                <div key={emotion} className="flex items-center space-x-2">
                                  <span className="text-sm capitalize w-20">{emotion}:</span>
                                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                      style={{ width: `${score * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-slate-500 w-12">{Math.round(score * 100)}%</span>
                                </div>
                              ))}
                          </div>

                          {lastFaceDetection && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Last detected: {formatTimeAgo(lastFaceDetection)}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Face Detection Settings */}
                  <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span>Detection Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Privacy Controls */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {facePrivacyMode ? (
                              <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <Unlock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            )}
                            <Label htmlFor="face-privacy" className="text-sm font-medium">
                              Face Privacy Mode
                            </Label>
                          </div>
                          <Switch id="face-privacy" checked={facePrivacyMode} onCheckedChange={setFacePrivacyMode} />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {facePrivacyMode
                            ? "Face data is processed locally and not stored"
                            : "Face detection history will be saved locally"}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Waves className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <Label htmlFor="auto-search" className="text-sm font-medium">
                              Auto Search
                            </Label>
                          </div>
                          <Switch id="auto-search" checked={autoSearchEnabled} onCheckedChange={setAutoSearchEnabled} />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Automatically search for content when emotions are detected (triggers at 40% confidence)
                        </p>
                      </div>

                      {/* Detection Interval */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Detection Interval</Label>
                        <select
                          value={detectionInterval}
                          onChange={(e) => setDetectionInterval(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                        >
                          <option value={1000}>1 second (High frequency)</option>
                          <option value={2000}>2 seconds (Balanced)</option>
                          <option value={3000}>3 seconds (Standard)</option>
                          <option value={5000}>5 seconds (Low frequency)</option>
                        </select>
                      </div>

                      {/* Stream Quality */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Camera Quality</Label>
                        <select
                          value={streamQuality}
                          onChange={(e) => setStreamQuality(e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                        >
                          <option value="low">Low (320p) - Faster processing</option>
                          <option value="medium">Medium (480p) - Balanced</option>
                          <option value="high">High (720p) - Better accuracy</option>
                        </select>
                      </div>

                      {/* Data Management */}
                      {!facePrivacyMode && (faceDetectionHistory.length > 0 || realtimeEmotions.length > 0) && (
                        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-600">
                          <Label className="text-sm font-medium">Data Management</Label>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={exportFaceData}
                              className="flex-1 bg-transparent"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Export
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={clearFaceHistory}
                              className="flex-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Clear
                            </Button>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {realtimeEmotions.length} real-time detection{realtimeEmotions.length !== 1 ? "s" : ""} •{" "}
                            {faceDetectionHistory.length} stored
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Error Alert */}
          {error && (
            <Alert className="mb-8 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 animate-shake shadow-lg backdrop-blur-sm">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-base text-red-700 dark:text-red-300">{error}</AlertDescription>
            </Alert>
          )}

          {/* Enhanced Emotion Selection */}
          <Card className="mb-12 shadow-4xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md hover:shadow-4xl transition-all duration-700 transform hover:-translate-y-2 card-hover border border-slate-200/50 dark:border-slate-700/50">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center space-x-4 text-responsive-2xl">
                <Sparkles className="w-10 h-10 text-purple-500 dark:text-purple-400 animate-spin-slow" />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  How are you feeling right now?
                </span>
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 dark:text-slate-300 mt-4">
                Select an emotion, describe your feelings, or use face detection for real-time AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preset" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-10 h-14 bg-slate-100 dark:bg-slate-700 rounded-2xl p-2">
                  <TabsTrigger value="preset" className="text-lg font-medium rounded-xl">
                    Choose Emotion
                  </TabsTrigger>
                  <TabsTrigger value="custom" className="text-lg font-medium rounded-xl">
                    AI Analysis
                  </TabsTrigger>
                  <TabsTrigger value="face" className="text-lg font-medium rounded-xl">
                    Face Detection
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preset" className="mt-10">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {emotions.map((emotion, index) => {
                      const Icon = emotion.icon
                      return (
                        <div key={emotion.id} className="relative group">
                          <Button
                            variant={selectedEmotion?.id === emotion.id ? "default" : "outline"}
                            className={`h-auto p-8 flex flex-col items-center space-y-4 transition-all duration-500 hover:scale-110 hover:rotate-2 ${
                              selectedEmotion?.id === emotion.id
                                ? `ring-4 ring-purple-300 dark:ring-purple-600 shadow-4xl scale-110 rotate-2 ${emotion.shadow} bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0`
                                : `hover:shadow-4xl group-hover:shadow-4xl ${emotion.shadow} hover:shadow-lg bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-600`
                            } w-full animate-fade-in-up border-2 rounded-3xl backdrop-blur-sm card-hover`}
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => handleEmotionSelect(emotion)}
                            disabled={isSearching}
                          >
                            <div
                              className={`w-16 h-16 rounded-3xl ${emotion.color} flex items-center justify-center shadow-2xl transform group-hover:scale-125 transition-all duration-500 ${emotion.shadow} animate-float`}
                              style={{ animationDelay: `${index * 200}ms` }}
                            >
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">
                                {emotion.label}
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-400 leading-tight px-1">
                                {emotion.description}
                              </div>
                            </div>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="mt-10">
                  <div className="space-y-8">
                    <div className="flex space-x-4">
                      <Input
                        placeholder="Describe your feelings in detail... (e.g., 'I feel creatively blocked and need fresh inspiration to spark my imagination')"
                        value={customEmotion}
                        onChange={(e) => setCustomEmotion(e.target.value)}
                        className="flex-1 text-lg py-8 px-6 rounded-2xl border-3 focus:border-purple-400 dark:focus:border-purple-500 transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg focus-ring border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200"
                        onKeyPress={(e) => e.key === "Enter" && handleCustomSearch()}
                        disabled={isSearching || isAnalyzing}
                      />
                      <Button
                        onClick={handleCustomSearch}
                        disabled={!customEmotion.trim() || isSearching || isAnalyzing}
                        className="px-12 py-8 rounded-2xl btn-gradient transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg font-bold text-white border-0"
                      >
                        {isSearching || isAnalyzing ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <Lightning className="w-6 h-6" />
                        )}
                      </Button>
                    </div>
                    <div className="text-center">
                      <p className="text-base text-slate-600 dark:text-slate-400">
                        🤖 Advanced AI will analyze your text and find the perfect emotional match
                      </p>
                      {isAnalyzing && (
                        <div className="mt-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium animate-pulse mb-4">
                            Analyzing your emotions with AI...
                          </p>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full animate-pulse w-3/4 transition-all duration-500"></div>
                          </div>
                        </div>
                      )}
                      {emotionConfidence > 0 && selectedEmotion && (
                        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800 backdrop-blur-sm">
                          <p className="text-sm text-green-700 dark:text-green-300 flex items-center justify-center space-x-2">
                            <ZapIcon className="w-4 h-4" />
                            <span>
                              AI Confidence: {Math.round(emotionConfidence * 100)}% • Detected: {selectedEmotion.label}
                            </span>
                            <Stars className="w-4 h-4 animate-pulse" />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="face" className="mt-10">
                  <div className="text-center space-y-8">
                    <div className="max-w-2xl mx-auto">
                      <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                        Real-Time Face Emotion Detection
                      </h3>
                      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                        Use your camera to automatically detect emotions and discover matching content in real-time.
                        Your privacy is protected with local processing and optional data storage.
                      </p>

                      {!isCameraActive ? (
                        <div className="space-y-6">
                          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse-glow">
                            <Camera className="w-16 h-16 text-white" />
                          </div>
                          <Button
                            onClick={startFaceDetection}
                            className="btn-gradient text-white border-0 px-12 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl text-xl font-bold"
                            disabled={cameraPermission === "denied"}
                          >
                            <Camera className="w-6 h-6 mr-3" />
                            Start Face Detection
                          </Button>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                              <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
                              <h4 className="font-bold mb-2">Privacy First</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                All processing happens locally on your device
                              </p>
                            </div>
                            <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                              <Brain className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                              <h4 className="font-bold mb-2">AI Powered</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Advanced emotion recognition technology
                              </p>
                            </div>
                            <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                              <Lightning className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                              <h4 className="font-bold mb-2">Real-Time</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Instant emotion detection and content discovery
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="flex items-center justify-center space-x-4">
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                              Face detection is active
                            </span>
                          </div>
                          {overallEmotionAnalysis && (
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
                              <p className="text-lg font-bold text-purple-800 dark:text-purple-200 mb-2">
                                Overall Emotion: {overallEmotionAnalysis.dominantEmotion}
                              </p>
                              <p className="text-purple-600 dark:text-purple-400">
                                Confidence: {Math.round(overallEmotionAnalysis.averageConfidence * 100)}% • Based on{" "}
                                {overallEmotionAnalysis.totalDetections} detections
                              </p>
                            </div>
                          )}
                          {faceEmotionData && (
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
                              <p className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">
                                Current Emotion: {faceEmotionData.dominantEmotion}
                              </p>
                              <p className="text-blue-600 dark:text-blue-400">
                                Confidence: {Math.round(faceEmotionData.confidence * 100)}%
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Enhanced Search Progress */}
          {isSearching && (
            <Card className="mb-8 shadow-lg border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Searching real-time content...
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                      {Math.round(searchProgress)}%
                    </span>
                  </div>
                  <Progress value={searchProgress} className="w-full h-3 bg-slate-200 dark:bg-slate-700" />
                  <div className="flex justify-center space-x-6 text-xs text-slate-500 dark:text-slate-400">
                    <span
                      className={`flex items-center space-x-1 transition-colors duration-300 ${searchProgress > 25 ? "text-green-600 dark:text-green-400" : ""}`}
                    >
                      <Music className="w-4 h-4" />
                      <span>Music</span>
                    </span>
                    <span
                      className={`flex items-center space-x-1 transition-colors duration-300 ${searchProgress > 50 ? "text-green-600 dark:text-green-400" : ""}`}
                    >
                      <Video className="w-4 h-4" />
                      <span>Videos</span>
                    </span>
                    <span
                      className={`flex items-center space-x-1 transition-colors duration-300 ${searchProgress > 75 ? "text-green-600 dark:text-green-400" : ""}`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>News</span>
                    </span>
                    <span
                      className={`flex items-center space-x-1 transition-colors duration-300 ${searchProgress > 90 ? "text-green-600 dark:text-green-400" : ""}`}
                    >
                      <Quote className="w-4 h-4" />
                      <span>Quotes</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Search Results */}
          {(isSearching || searchResults.length > 0) && (
            <Card className="mb-12 shadow-4xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md animate-slide-up card-hover border border-slate-200/50 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-responsive-2xl">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    {selectedEmotion ? `Live Content for "${selectedEmotion.label}"` : "Search Results"}
                  </span>
                  <div className="flex items-center space-x-4">
                    {selectedEmotion && (
                      <Badge
                        className={`flex items-center space-x-3 px-6 py-3 text-white border-0 shadow-xl text-lg ${selectedEmotion.color} hover:scale-105 transition-transform duration-300`}
                      >
                        <selectedEmotion.icon className="w-5 h-5" />
                        <span>{selectedEmotion.label}</span>
                      </Badge>
                    )}
                    {searchResults.length > 0 && (
                      <Badge
                        variant="outline"
                        className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-slate-200 dark:border-slate-600"
                      >
                        {searchResults.length} results
                      </Badge>
                    )}
                  </div>
                </CardTitle>
                <CardDescription className="text-lg text-slate-600 dark:text-slate-300">
                  Real-time content from Spotify, YouTube, news sources, and quote databases • Updated every search
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isSearching && searchResults.length > 0 ? (
                  <div className="grid gap-8">
                    {searchResults.map((result, index) => {
                      const Icon = result.icon
                      return (
                        <div
                          key={`${result.type}-${index}-${Date.now()}`}
                          className="flex items-center space-x-8 p-8 rounded-3xl border-2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 transition-all duration-500 hover:shadow-4xl hover:scale-[1.02] group animate-fade-in-up shadow-lg card-hover border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-600 backdrop-blur-sm"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          {result.image && (
                            <img
                              src={result.image || "/placeholder.svg"}
                              alt={result.title}
                              className="w-28 h-28 rounded-3xl object-cover shadow-xl group-hover:scale-110 transition-transform duration-500 border-2 border-slate-200 dark:border-slate-600"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=112&width=112"
                              }}
                            />
                          )}
                          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-pulse-glow">
                            <Icon className="w-12 h-12 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-xl mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                              {result.title}
                            </h3>
                            <div className="flex items-center flex-wrap gap-4 text-base text-slate-600 dark:text-slate-400 mb-3">
                              <span className="font-semibold flex items-center space-x-2">
                                <Globe className="w-4 h-4" />
                                <span>{result.source}</span>
                              </span>
                              {result.duration && (
                                <span className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{result.duration}</span>
                                </span>
                              )}
                              {result.readTime && (
                                <span className="flex items-center space-x-2">
                                  <BookOpen className="w-4 h-4" />
                                  <span>{result.readTime}</span>
                                </span>
                              )}
                            </div>
                            {result.stats && (
                              <div className="flex items-center flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                                {result.stats.plays && (
                                  <span className="flex items-center space-x-1">
                                    <Headphones className="w-3 h-3" />
                                    <span>{result.stats.plays}</span>
                                  </span>
                                )}
                                {result.stats.views && (
                                  <span className="flex items-center space-x-1">
                                    <Eye className="w-3 h-3" />
                                    <span>{result.stats.views}</span>
                                  </span>
                                )}
                                {result.stats.date && (
                                  <span className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{result.stats.date}</span>
                                  </span>
                                )}
                                {result.stats.category && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                  >
                                    {result.stats.category}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col space-y-3">
                            {result.url && (
                              <Button
                                size="lg"
                                variant="ghost"
                                className="opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-125 hover:bg-purple-100 dark:hover:bg-purple-900/50 p-4 rounded-2xl shadow-lg hover:shadow-xl"
                                onClick={() => window.open(result.url, "_blank", "noopener,noreferrer")}
                              >
                                {result.type === "video" || result.type === "music" ? (
                                  <Play className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                ) : (
                                  <ExternalLink className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                )}
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                              onClick={() => {
                                if (navigator.share) {
                                  navigator.share({
                                    title: result.title,
                                    url: result.url,
                                  })
                                }
                              }}
                            >
                              <Share2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : !isSearching ? (
                  <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                      <AlertCircle className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                    </div>
                    <p className="text-2xl font-bold mb-3">No results found for this emotion.</p>
                    <p className="text-lg">Try a different emotion or refine your search terms.</p>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}

          {/* Enhanced EmoGraph with Face Detection History */}
          {showEmoGraph &&
            (emotionHistory.length > 0 || faceDetectionHistory.length > 0 || realtimeEmotions.length > 0) && (
              <Card className="mb-12 shadow-4xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md animate-slide-up card-hover border border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4 text-responsive-2xl">
                    <BarChart3 className="w-10 h-10 text-purple-500 dark:text-purple-400 animate-pulse" />
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      EmoGraph - Your Emotional Journey
                    </span>
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600 dark:text-slate-300">
                    Real-time tracking of your emotional patterns, AI confidence scores, and face detection history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="search-history" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="search-history">Search History</TabsTrigger>
                      <TabsTrigger value="face-history">Face Detection</TabsTrigger>
                      <TabsTrigger value="realtime-analysis">Real-time Analysis</TabsTrigger>
                    </TabsList>

                    <TabsContent value="search-history">
                      <div className="grid gap-6">
                        {emotionHistory.map((entry, index) => {
                          const emotion = emotions.find((e) => e.id === entry.emotion)
                          const Icon = emotion?.icon || User
                          return (
                            <div
                              key={`${entry.timestamp}-${index}`}
                              className="flex items-center space-x-6 p-6 rounded-3xl bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-600 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up shadow-lg hover:shadow-xl card-hover border border-slate-200 dark:border-slate-600 backdrop-blur-sm"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div
                                className={`w-18 h-18 rounded-3xl ${emotion?.color || "bg-gray-500"} flex items-center justify-center shadow-xl animate-float`}
                                style={{ animationDelay: `${index * 300}ms` }}
                              >
                                <Icon className="w-9 h-9 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className="font-bold text-xl capitalize text-slate-800 dark:text-slate-200">
                                    {emotion?.label || entry.emotion}
                                  </div>
                                  {entry.confidence && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
                                    >
                                      {entry.confidence}% confidence
                                    </Badge>
                                  )}
                                  {entry.source === "face-detection" && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                                    >
                                      <Camera className="w-3 h-3 mr-1" />
                                      Face Detected
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-base text-slate-600 dark:text-slate-400">{entry.query}</div>
                              </div>
                              <div className="text-base text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                                {formatTimeAgo(entry.timestamp)}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </TabsContent>

                    <TabsContent value="face-history">
                      {!facePrivacyMode && faceDetectionHistory.length > 0 ? (
                        <div className="grid gap-6">
                          {faceDetectionHistory.slice(0, 20).map((detection, index) => {
                            const emotion = emotions.find((e) => e.id === detection.dominantEmotion)
                            const Icon = emotion?.icon || Brain
                            return (
                              <div
                                key={`${detection.timestamp}-${index}`}
                                className="flex items-center space-x-6 p-6 rounded-3xl bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up shadow-lg hover:shadow-xl card-hover border border-blue-200 dark:border-blue-700 backdrop-blur-sm"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div
                                  className={`w-18 h-18 rounded-3xl ${emotion?.color || "bg-blue-500"} flex items-center justify-center shadow-xl animate-float`}
                                  style={{ animationDelay: `${index * 300}ms` }}
                                >
                                  <Icon className="w-9 h-9 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <div className="font-bold text-xl capitalize text-slate-800 dark:text-slate-200">
                                      {detection.dominantEmotion}
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                                    >
                                      {Math.round(detection.confidence * 100)}% confidence
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
                                    >
                                      <Camera className="w-3 h-3 mr-1" />
                                      Face Detection
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">
                                    Top emotions:{" "}
                                    {Object.entries(detection.emotions)
                                      .sort(([, a], [, b]) => b - a)
                                      .slice(0, 3)
                                      .map(([emotion, score]) => `${emotion} (${Math.round(score * 100)}%)`)
                                      .join(", ")}
                                  </div>
                                </div>
                                <div className="text-base text-slate-500 dark:text-slate-400 font-medium bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                                  {formatTimeAgo(detection.timestamp)}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : facePrivacyMode ? (
                        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Lock className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                          </div>
                          <p className="text-2xl font-bold mb-3">Face Privacy Mode is Enabled</p>
                          <p className="text-lg">Face detection history is not stored when privacy mode is active.</p>
                        </div>
                      ) : (
                        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Camera className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                          </div>
                          <p className="text-2xl font-bold mb-3">No Face Detection History</p>
                          <p className="text-lg">Start using face detection to see your emotional patterns here.</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="realtime-analysis">
                      {realtimeEmotions.length > 0 ? (
                        <div className="space-y-8">
                          {/* Overall Analysis Summary */}
                          {overallEmotionAnalysis && (
                            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center space-x-2">
                                  <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                  <span>Overall Emotion Summary</span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-bold text-lg mb-3">Dominant Emotion</h4>
                                    <div className="flex items-center space-x-3">
                                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                        <Brain className="w-6 h-6 text-white" />
                                      </div>
                                      <div>
                                        <div className="font-bold text-xl capitalize">
                                          {overallEmotionAnalysis.dominantEmotion}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                          {Math.round(overallEmotionAnalysis.dominantScore * 100)}% average intensity
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-lg mb-3">Detection Stats</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span>Total Detections:</span>
                                        <span className="font-bold">{overallEmotionAnalysis.totalDetections}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Average Confidence:</span>
                                        <span className="font-bold">
                                          {Math.round(overallEmotionAnalysis.averageConfidence * 100)}%
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Time Span:</span>
                                        <span className="font-bold">
                                          {overallEmotionAnalysis.timeSpan.start &&
                                            formatTimeAgo(overallEmotionAnalysis.timeSpan.start)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          {/* Recent Real-time Detections */}
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                              Recent Real-time Detections
                            </h3>
                            <div className="grid gap-4">
                              {realtimeEmotions.slice(0, 10).map((detection, index) => {
                                const emotion = emotions.find((e) => e.id === detection.dominantEmotion)
                                const Icon = emotion?.icon || Brain
                                return (
                                  <div
                                    key={`${detection.timestamp}-${index}`}
                                    className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-50/50 to-blue-50/50 dark:from-cyan-900/10 dark:to-blue-900/10 border border-cyan-200 dark:border-cyan-700 backdrop-blur-sm"
                                  >
                                    <div
                                      className={`w-12 h-12 rounded-2xl ${emotion?.color || "bg-blue-500"} flex items-center justify-center shadow-lg`}
                                    >
                                      <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-bold capitalize text-slate-800 dark:text-slate-200">
                                          {detection.dominantEmotion}
                                        </span>
                                        <Badge
                                          variant="outline"
                                          className="text-xs bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700"
                                        >
                                          {Math.round(detection.confidence * 100)}%
                                        </Badge>
                                      </div>
                                      <div className="text-xs text-slate-500 dark:text-slate-400">
                                        {formatTimeAgo(detection.timestamp)}
                                      </div>
                                    </div>
                                    <div className="text-xs text-slate-400 dark:text-slate-500">#{index + 1}</div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Activity className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                          </div>
                          <p className="text-2xl font-bold mb-3">No Real-time Data</p>
                          <p className="text-lg">Start face detection to see real-time emotion analysis here.</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

          {/* Enhanced Emotion Loop Suggestions */}
          {selectedEmotion && searchResults.length > 0 && (
            <Card className="shadow-4xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md animate-slide-up card-hover border border-slate-200/50 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-4 text-responsive-2xl">
                  <TrendingUp className="w-10 h-10 text-green-500 dark:text-green-400 animate-bounce" />
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Emotion Loop
                  </span>
                </CardTitle>
                <CardDescription className="text-lg text-slate-600 dark:text-slate-300">
                  AI-powered suggestions to guide your emotional journey with fresh content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-8 p-8 rounded-3xl bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border-3 border-green-200 dark:border-green-700 hover:shadow-4xl transition-all duration-500 shadow-lg card-hover backdrop-blur-sm">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                    <ArrowRight className="w-12 h-12 text-white animate-bounce" />
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-2xl mb-4 text-slate-800 dark:text-slate-200">
                      Ready for an emotional shift?
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 text-lg">
                      {selectedEmotion.id === "sad" && "Discover uplifting content to gradually brighten your day ☀️"}
                      {selectedEmotion.id === "anxious" && "Find calming content to help you feel more centered 🧘"}
                      {selectedEmotion.id === "happy" &&
                        "Keep the positive energy flowing with more joyful content! 🎉"}
                      {!["sad", "anxious", "happy"].includes(selectedEmotion.id) &&
                        "Discover fresh content to enhance or balance your current emotional state 🌟"}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-12 py-6 rounded-2xl hover:scale-110 transition-all duration-300 btn-gradient hover:text-white border-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-xl text-lg font-bold border-green-200 dark:border-green-700 hover:border-transparent"
                    onClick={() => {
                      const targetEmotion =
                        selectedEmotion.id === "sad"
                          ? emotions.find((e) => e.id === "happy")
                          : selectedEmotion.id === "anxious"
                            ? emotions.find((e) => e.id === "peaceful")
                            : emotions.find((e) => e.id === "motivated")
                      if (targetEmotion) handleEmotionSelect(targetEmotion)
                    }}
                    disabled={isSearching}
                  >
                    <Lightning className="w-5 h-5 mr-2" />
                    Explore Journey
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Enhanced Privacy Notice */}
      <footer className="border-t bg-white/95 dark:bg-slate-900/95 backdrop-blur-md mt-20 shadow-lg border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center space-x-3 text-base text-slate-700 dark:text-slate-300 mb-6">
            <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            <span className="font-medium">
              {privacyMode
                ? "🔒 Privacy Mode: ON - All data stored locally on your device"
                : "🔓 Privacy Mode: OFF - Search history may be used for recommendations"}
            </span>
            {facePrivacyMode && (
              <>
                <span className="text-slate-400">•</span>
                <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">Face Privacy: ON - Local processing only</span>
              </>
            )}
          </div>
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p className="font-medium mb-2">
              FeelSearch • Real-Time AI Emotion Discovery with Face Recognition • Made with ❤️ for your wellbeing
            </p>
            <p className="flex items-center justify-center space-x-2">
              <span>
                Live content from Spotify, Apple Music, YouTube, NewsAPI, and Quotable • Face detection powered by AI •
                Results refresh every search
              </span>
              <Stars className="w-4 h-4 text-yellow-500 animate-pulse" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
