"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  RotateCcw,
  MessageCircle,
  MapPin,
  Camera,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "monk"
  timestamp: Date
  type?: "text" | "suggestion" | "monastery-info"
  metadata?: {
    monasteryId?: number
    actionType?: "view-monastery" | "start-tour" | "get-directions"
  }
}

interface MonkGuideChatProps {
  isOpen: boolean
  onClose: () => void
  onMonasterySelect?: (monasteryId: number) => void
  currentMonastery?: { id: number; name: string } | null
}

const quickSuggestions = [
  "Tell me about Rumtek Monastery",
  "What's the best time to visit Sikkim monasteries?",
  "How do I get to Pemayangtse?",
  "Explain Buddhist meditation practices",
  "Show me nearby monasteries",
  "What should I wear when visiting?",
]

const monkResponses = {
  greeting:
    "🙏 Namaste! I am Tenzin, your AI Monk Guide. I'm here to help you discover the sacred monasteries of Sikkim and learn about our Buddhist traditions. How may I assist you on your spiritual journey?",

  monasteryInfo: {
    1: "Rumtek Monastery is the largest monastery in Sikkim and the main seat of the Karmapa outside Tibet. Built in the 1960s, it houses precious relics and represents the Kagyu lineage of Tibetan Buddhism. The golden stupa is particularly magnificent during morning prayers.",
    2: "Pemayangtse Monastery, founded in 1705, is one of Sikkim's oldest and most sacred monasteries. It belongs to the Nyingma order and offers breathtaking views of Kanchenjunga. The seven-tiered wooden sculpture is a masterpiece you must see.",
    3: "Enchey Monastery, meaning 'solitary temple,' was built in 1909. It's famous for its annual Cham dance festival and beautiful prayer wheels. The monastery serves as an important spiritual center for the local community in Gangtok.",
  },

  generalAdvice: [
    "When visiting our monasteries, please dress modestly and remove your shoes before entering the prayer halls. Maintain silence during prayers and follow the guidance of monastery staff.",
    "The best time to visit Sikkim monasteries is from October to March when the weather is clear and you can enjoy stunning mountain views. Early morning visits often coincide with prayer sessions.",
    "Each monastery has its own unique character. Rumtek showcases Kagyu traditions, Pemayangtse represents Nyingma heritage, and Enchey offers vibrant cultural experiences.",
    "Buddhist meditation focuses on mindfulness and compassion. Many monasteries offer meditation sessions for visitors. The peaceful environment naturally encourages contemplation.",
  ],

  fallback:
    "I understand you're curious about our monasteries and Buddhist culture. Could you please rephrase your question? I'm here to help with information about Sikkim's sacred sites, visiting guidelines, Buddhist practices, and spiritual guidance.",
}

export function MonkGuideChat({ isOpen, onClose, onMonasterySelect, currentMonastery }: MonkGuideChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Initialize with greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingMessage: Message = {
        id: Date.now().toString(),
        content: monkResponses.greeting,
        sender: "monk",
        timestamp: new Date(),
        type: "text",
      }
      setMessages([greetingMessage])
    }
  }, [isOpen, messages.length])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Speech recognition setup
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const generateMonkResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    let response = monkResponses.fallback
    let type: Message["type"] = "text"
    let metadata: Message["metadata"] = undefined

    // Check for monastery-specific queries
    if (lowerMessage.includes("rumtek")) {
      response = monkResponses.monasteryInfo[1]
      type = "monastery-info"
      metadata = { monasteryId: 1, actionType: "view-monastery" }
    } else if (lowerMessage.includes("pemayangtse")) {
      response = monkResponses.monasteryInfo[2]
      type = "monastery-info"
      metadata = { monasteryId: 2, actionType: "view-monastery" }
    } else if (lowerMessage.includes("enchey")) {
      response = monkResponses.monasteryInfo[3]
      type = "monastery-info"
      metadata = { monasteryId: 3, actionType: "view-monastery" }
    } else if (lowerMessage.includes("visit") || lowerMessage.includes("time") || lowerMessage.includes("when")) {
      response = monkResponses.generalAdvice[1]
    } else if (lowerMessage.includes("dress") || lowerMessage.includes("wear") || lowerMessage.includes("guidelines")) {
      response = monkResponses.generalAdvice[0]
    } else if (
      lowerMessage.includes("meditation") ||
      lowerMessage.includes("practice") ||
      lowerMessage.includes("buddhist")
    ) {
      response = monkResponses.generalAdvice[3]
    } else if (lowerMessage.includes("monastery") || lowerMessage.includes("monasteries")) {
      response = monkResponses.generalAdvice[2]
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: "monk",
      timestamp: new Date(),
      type,
      metadata,
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const monkMessage = generateMonkResponse(content)
        setMessages((prev) => [...prev, monkMessage])
        setIsTyping(false)

        // Text-to-speech for monk responses
        if (isSpeaking && "speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(monkMessage.content)
          utterance.rate = 0.8
          utterance.pitch = 0.9
          speechSynthesis.speak(utterance)
        }
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const handleMonasteryAction = (monasteryId: number, actionType: string) => {
    if (actionType === "view-monastery" && onMonasterySelect) {
      onMonasterySelect(monasteryId)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: monkResponses.greeting,
        sender: "monk",
        timestamp: new Date(),
        type: "text",
      },
    ])
  }

  if (!isOpen) return null

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isMinimized ? "w-80" : "w-96"} max-w-[calc(100vw-2rem)]`}>
      <Card className="shadow-2xl border-accent/20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-accent/5">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?key=monk-avatar" alt="Monk Tenzin" />
              <AvatarFallback className="bg-accent text-accent-foreground">T</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">Monk Tenzin</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">AI Guide Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => setIsSpeaking(!isSpeaking)}>
              {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={clearChat}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                      {message.sender === "monk" && (
                        <div className="flex items-center space-x-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?key=monk-avatar" alt="Monk Tenzin" />
                            <AvatarFallback className="bg-accent text-accent-foreground text-xs">T</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">Monk Tenzin</span>
                        </div>
                      )}

                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm text-pretty">{message.content}</p>

                        {message.type === "monastery-info" && message.metadata && (
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <div className="flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs bg-transparent"
                                onClick={() => handleMonasteryAction(message.metadata!.monasteryId!, "view-monastery")}
                              >
                                <MapPin className="h-3 w-3 mr-1" />
                                View Details
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                                <Camera className="h-3 w-3 mr-1" />
                                360° Tour
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-muted-foreground mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?key=monk-avatar" alt="Monk Tenzin" />
                        <AvatarFallback className="bg-accent text-accent-foreground text-xs">T</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Suggestions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs bg-transparent"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Ask about monasteries, Buddhism, or visiting tips..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                    className="pr-10"
                  />
                  {recognitionRef.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 ${
                        isListening ? "text-red-500" : ""
                      }`}
                      onClick={handleVoiceInput}
                    >
                      {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                    </Button>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="bg-accent hover:bg-accent/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <MessageCircle className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Monk Guide</span>
              {messages.length > 1 && (
                <Badge variant="secondary" className="text-xs">
                  {messages.filter((m) => m.sender === "user").length}
                </Badge>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
