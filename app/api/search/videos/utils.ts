export function getCuratedVideos(emotion: string) {
  const videosByEmotion = {
    happy: [
      {
        id: { videoId: "ZbZSe6N_BXs" },
        snippet: {
          title: "Happy - Pharrell Williams (Official Music Video)",
          channelTitle: "PharrellWilliamsVEVO",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2013-11-21T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
        duration: "PT3M53S",
        views: "1400000000",
      },
      {
        id: { videoId: "ru0K8uYEZWw" },
        snippet: {
          title: "Can't Stop the Feeling! - Justin Timberlake (Official Video)",
          channelTitle: "JustinTimberlakeVEVO",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2016-05-06T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=ru0K8uYEZWw",
        duration: "PT3M56S",
        views: "900000000",
      },
    ],
    sad: [
      {
        id: { videoId: "hLQl3WQQoQ0" },
        snippet: {
          title: "Someone Like You - Adele (Official Music Video)",
          channelTitle: "AdeleVEVO",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2011-01-24T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=hLQl3WQQoQ0",
        duration: "PT4M45S",
        views: "2800000000",
      },
      {
        id: { videoId: "4N3N1MlvVc4" },
        snippet: {
          title: "Mad World - Gary Jules (Official Video)",
          channelTitle: "GaryJulesOfficial",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2003-12-01T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=4N3N1MlvVc4",
        duration: "PT3M07S",
        views: "180000000",
      },
    ],
    energized: [
      {
        id: { videoId: "btPJPFnesV4" },
        snippet: {
          title: "Eye of the Tiger - Survivor (Official HD Video)",
          channelTitle: "SurvivorVEVO",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2009-10-25T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=btPJPFnesV4",
        duration: "PT4M04S",
        views: "800000000",
      },
      {
        id: { videoId: "fKopy74weus" },
        snippet: {
          title: "Thunder - Imagine Dragons (Official Music Video)",
          channelTitle: "ImagineDragonsVEVO",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2017-05-02T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=fKopy74weus",
        duration: "PT3M07S",
        views: "2200000000",
      },
    ],
    peaceful: [
      {
        id: { videoId: "UfcAVejslrU" },
        snippet: {
          title: "Weightless - Marconi Union (Most Relaxing Song Ever)",
          channelTitle: "RelaxingMusic",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2011-10-16T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=UfcAVejslrU",
        duration: "PT8M08S",
        views: "45000000",
      },
      {
        id: { videoId: "4Tr0oGOIbINNEmWKBEBNEW" },
        snippet: {
          title: "Clair de Lune - Claude Debussy (Beautiful Classical Music)",
          channelTitle: "ClassicalMusic",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2015-03-15T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=CvFH_6DNRCY",
        duration: "PT5M20S",
        views: "25000000",
      },
    ],
    creative: [
      {
        id: { videoId: "fJ9rUzIMcZQ" },
        snippet: {
          title: "Bohemian Rhapsody - Queen (Official Video Remastered)",
          channelTitle: "QueenOfficial",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2008-08-01T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
        duration: "PT5M55S",
        views: "1600000000",
      },
      {
        id: { videoId: "YkgkThdzX-8" },
        snippet: {
          title: "Imagine - John Lennon (Official Video)",
          channelTitle: "JohnLennonOfficial",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2010-01-06T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=YkgkThdzX-8",
        duration: "PT3M07S",
        views: "450000000",
      },
    ],
    romantic: [
      {
        id: { videoId: "2Vv-BfVoq4g" },
        snippet: {
          title: "Perfect - Ed Sheeran (Official Music Video)",
          channelTitle: "EdSheeranOfficial",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2017-11-09T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
        duration: "PT4M23S",
        views: "3400000000",
      },
      {
        id: { videoId: "450p7goxZqg" },
        snippet: {
          title: "All of Me - John Legend (Official Video)",
          channelTitle: "JohnLegendVEVO",
          thumbnails: { medium: { url: "/placeholder.svg?height=180&width=320" } },
          publishedAt: "2013-08-12T00:00:00Z",
        },
        url: "https://www.youtube.com/watch?v=450p7goxZqg",
        duration: "PT4M29S",
        views: "3100000000",
      },
    ],
  }

  return videosByEmotion[emotion] || videosByEmotion.happy
}
