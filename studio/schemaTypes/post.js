// schemaTypes/rosieDiary.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'rosieDiary',
  title: "Rosie's Diary",
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'mood',
      title: 'Mood',
      type: 'string',
      options: {
        list: [
          {title: 'Playful Pup', value: 'playful_pup'},
          {title: 'Sleepy Doggo', value: 'sleepy_doggo'},
          {title: 'Treat Hunter', value: 'treat_hunter'},
          {title: 'Zoomies Mode', value: 'zoomies'},
          {title: 'Cuddle Mode', value: 'cuddle_mode'},
          {title: 'Training Time', value: 'learning_sit'},
          {title: 'Guardian Mode', value: 'protect_mode'},
          {title: 'Treat Zone (Legacy)', value: 'banana_zone'},
          {title: 'Playful Pup (Legacy)', value: 'full_savage'},
          {title: 'Training Mode (Legacy)', value: 'laser_focus'},
          {title: 'Guardian Mode (Legacy)', value: 'revenge_mode'},
          {title: 'Sleepy Doggo (Legacy)', value: 'zen_monkey'},
        ],
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'tradingMetrics',
      title: 'Trading Metrics',
      type: 'object',
      fields: [
        {name: 'trades', type: 'number', title: 'Trades'},
        {name: 'winRate', type: 'number', title: 'Win Rate (%)'},
        {name: 'level', type: 'number', title: 'Level'},
        {name: 'elo', type: 'number', title: 'ELO Rating'},
        {name: 'pnl', type: 'number', title: 'Session P&L ($)'},
      ],
    }),
    defineField({
      name: 'tokenAnalyzed',
      title: 'Token Analyzed',
      type: 'object',
      fields: [
        {name: 'symbol', type: 'string', title: 'Symbol'},
        {name: 'chain', type: 'string', title: 'Blockchain'},
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'candlestickChart',
      title: 'Candlestick Chart',
      type: 'image',
    }),
    defineField({
      name: 'featureHeatmap',
      title: 'AI Brain Activity Heatmap',
      type: 'image',
    }),
    defineField({
      name: 'performanceChart',
      title: 'Performance Chart',
      type: 'image',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'candlestickChart',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.date ? new Date(selection.date).toLocaleDateString() : 'No date',
        media: selection.media,
      }
    },
  },
})