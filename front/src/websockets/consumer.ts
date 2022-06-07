import actioncable from 'actioncable'
import { wsUrl } from 'src/config/application'

export const CONSUMER =  actioncable.createConsumer(wsUrl)
