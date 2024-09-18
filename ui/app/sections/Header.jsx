import SparklesText from "@nyxui/sparkles-text"
import WordPullUp from "@nyxui/word-pull-up"

export default function Header() {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-6xl font-semibold">
        <SparklesText text={"Payload"} />
      </h1>
      <WordPullUp words={"Image Processing Suite"} className={"h3"} />
    </div>

  )
}
