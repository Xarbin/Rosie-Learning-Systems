// schemas/rosieDiary.js
export default {
  name: 'rosieDiary',
  title: 'Rosie Diary Entries',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'candlestickChart',
      title: 'Candlestick Chart with Trades',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
  name: 'content',
  title: 'Diary Content',
  type: 'array', // Changed from 'text'
  of: [
    {
      type: 'block', // This enables rich text
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'}
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'}
        ]
      }
    }
  ],
  validation: Rule => Rule.required()
},
    {
      name: 'featureHeatmap',
      title: 'Feature Importance Heatmap',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'performanceChart',
      title: 'Performance Chart',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'tradingMetrics',
      title: 'Trading Metrics',
      type: 'object',
      fields: [
        {name: 'trades', type: 'number', title: 'Number of Trades'},
        {name: 'winRate', type: 'number', title: 'Win Rate %'},
        {name: 'pnl', type: 'number', title: 'Total P&L'},
        {name: 'level', type: 'number', title: 'Rosie Level'},
        {name: 'elo', type: 'number', title: 'Rosie ELO'}
      ]
    },
    {
      name: 'mood',
      title: 'Rosie Mood',
      type: 'string',
      options: {
        list: [
          {title: '🍌 Banana Zone', value: 'banana_zone'},
          {title: '🦍 Full Savage', value: 'full_savage'},
          {title: '🎯 Laser Focus', value: 'laser_focus'},
          {title: '😤 Revenge Mode', value: 'revenge_mode'},
          {title: '🧘 Zen Monkey', value: 'zen_monkey'}
        ]
      }
    },
    {
      name: 'tokenAnalyzed',
      title: 'Token Analyzed',
      type: 'object',
      fields: [
        {name: 'symbol', type: 'string', title: 'Symbol'},
        {name: 'address', type: 'string', title: 'Contract Address'},
        {name: 'chain', type: 'string', title: 'Blockchain'}
      ]
    },
    {
      name: 'keyInsights',
      title: 'Key Insights',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Bullet points of key learnings'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      mood: 'mood',
      media: 'featureHeatmap'
    },
    prepare(selection) {
      const {title, date, mood, media} = selection
      const moodEmoji = {
        'banana_zone': '🍌',
        'full_savage': '🦍',
        'laser_focus': '🎯',
        'revenge_mode': '😤',
        'zen_monkey': '🧘'
      }
      return {
        title: `${moodEmoji[mood] || '🦍'} ${title}`,
        subtitle: new Date(date).toLocaleDateString(),
        media
      }
    }
  }
}