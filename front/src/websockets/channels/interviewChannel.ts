import { CONSUMER } from "../consumer"

export const connectToInterview = (id: string, setActiveUsers: any) => {
  return CONSUMER.subscriptions.create({ channel: 'InterviewChannel', id: id }, {
    initialized: () => {
      console.log('initializing interview: ', id)
    },

    connected: () => {
      console.log('Connected to: ', id)
    },

    received: (payload) => {
      if(payload.type === 'active_users') {
        setActiveUsers(payload.data)
      } else {
        console.log('Received: ', payload)
      }
    },

    disconnected: () => {
      console.log('Disconnected from: ', id)
    },

    rejected: () => {
      console.log('could not connect to: ', id)
    },
  })
}
