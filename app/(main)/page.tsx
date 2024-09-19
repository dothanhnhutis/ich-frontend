import Tiptap from "@/components/tiptap/tiptap";

export default function Home() {
  return (
    <div>
      <Tiptap />
      <br />
      <div className="flex items-center justify-end">
        <table className="overflow-x-scroll">
          <tbody>
            <tr>
              <th className="border">Name</th>
              <th colSpan={3} className="border">
                Description
              </th>
            </tr>
            <tr>
              <td className="border">Cyndi Lauper</td>
              <td className="border">Singer</td>
              <td className="border">Songwriter</td>
              <td className="border">Actress</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
