class StringUtil {
  public static toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())
  }
}

export default StringUtil