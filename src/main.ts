import 'dotenv/config'

import { container } from '@shaka/core'
import { logger } from '@shaka/logger'

async function bootstrap() {
	container.logger = logger()

	container.logger.info('Hello, World!')
}
bootstrap()
