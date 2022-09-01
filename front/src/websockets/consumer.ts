import Actioncable from 'actioncable'
import { wsUrl } from 'src/config/application'

export const CONSUMER = Actioncable.createConsumer(wsUrl)
