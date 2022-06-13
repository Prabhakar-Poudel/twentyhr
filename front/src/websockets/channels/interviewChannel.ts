import { CONSUMER } from '../consumer'

export const connectToInterview = (id: string, onChannelData: any) =>
  CONSUMER.subscriptions.create(
    { channel: 'InterviewChannel', id },
    {
      initialized: () => {
        console.log('initializing interview: ', id)
      },

      connected: () => {
        console.log('Connected to: ', id)
      },

      received: onChannelData,

      disconnected: () => {
        console.log('Disconnected from: ', id)
      },

      rejected: () => {
        console.log('could not connect to: ', id)
      },
    }
  )
