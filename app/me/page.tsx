export default function MePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Software developer, blogger, open-source enthusiast.</p>
        <p>
          <a href="https://github.com/songdaochuanshu" target="_blank" rel="noopener">GitHub</a>
          {" "}&middot;{" "}
          <a href="mailto:songdaochuanshu@gmail.com">Email</a>
        </p>
      </div>
    </div>
  )
}
