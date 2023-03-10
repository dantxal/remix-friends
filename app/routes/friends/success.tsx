import { Link } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";

export const loader = async ({request}: LoaderArgs) => {
  // const formData = await request.formData()

  // console.log(await formData.entries())

  return { bear: 'with me'}
}

export default function Success() {
  return <div>
    <Link to="/friends?banana=Eb">Go to friends</Link>
  </div>
}