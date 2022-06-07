import { CONSUMER } from "../consumer"

export const demoActiveUsers = [
  {
    id: '123',
    name: 'John Doe'
  },
  {
    id: '456',
    name: "Smantha Kally"
  },
  {
    id: '789',
    name: "Prabhakar Poudel"
  }
]

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
