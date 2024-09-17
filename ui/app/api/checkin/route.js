import { loadPyodide } from "pyodide"

export async function GET() {
  let pyodide = await loadPyodide();
  console.log(
    pyodide.runPython(
      `import sys
       sys.version
`
    )
  )
  return Response.json({
    "Message": "This should be working"
  })
}
