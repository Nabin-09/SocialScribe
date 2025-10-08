class Logger {
  info(message, ...args) {
    console.log(`ℹ️ [INFO] ${message}`, ...args);
  }

  success(message, ...args) {
    console.log(`✅ [SUCCESS] ${message}`, ...args);
  }

  error(message, ...args) {
    console.error(`❌ [ERROR] ${message}`, ...args);
  }

  warn(message, ...args) {
    console.warn(`⚠️ [WARN] ${message}`, ...args);
  }

  debug(message, ...args) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 [DEBUG] ${message}`, ...args);
    }
  }
}

export default new Logger();
