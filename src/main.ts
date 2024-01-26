import 'dotenv/config'

import { logger } from '@dnycts/logger'
import { container } from '@dnycts/shaka'

async function bootstrap() {
	container.logger = logger()
}
bootstrap()
