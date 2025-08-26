import Accordion, { AccordionItem } from "@/src/components/Accordion";
import Alerts from "@/src/components/Alerts/Alerts";
import Breadcrumbs from "@/src/components/Breadcrumb";
import ButtonGroup from "@/src/components/ButtonGroups/ButtonGroup";
import Buttons from "@/src/components/Buttons/Buttons";
import Cards from "@/src/components/Cards/Cards";
import DownloadCards from "@/src/components/DownloadCards/DownloadCards";
import FilterCarousel from "@/src/components/FilterCarousel";
import HeroBlocks from "@/src/components/HeroBlocks/HeroBlocks";
import InputFields from "@/src/components/InputFields/InputFields";
import Pagination from "@/src/components/Pagination";
import TextBlock from "@/src/components/TextBlock";

const items: AccordionItem[] = [
  {
    title: "Lorem ipsum dolor sit amet?",
    content:
      "Pellentesque at lacus ut arcu volutpat vulputate. Aenean gravida tincidunt arcu ut tincidunt. Fusce in vehicula risus. Sed scelerisque risus in mollis tincidunt. Vestibulum interdum nibh vulputate felis viverra dignissim.",
  },
  {
    title: "Another question here?",
    content:
      "Second answer text. You can also pass HTML via the `html` prop if needed.",
  },
];

export default function Components() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-white text-3xl font-manrope mb-8">Components</h1>
        <Accordion items={items} className="bg-brand-1-900" />
        <h2 className="text-2xl font-bold text-black text-center py-10 mb-14 border-b border-b-black">
          Alert
        </h2>
        <Alerts />
        <ButtonGroup />
        <Buttons />
        <Breadcrumbs
          items={[{ label: "Sample Item" }, { label: "Sample Item 2" }]}
        />
        <Cards />
        <DownloadCards />
        <FilterCarousel />
        <HeroBlocks />
        <InputFields />
        <h2 className="text-2xl font-bold text-black text-center py-10 mb-14 border-b border-b-black">
          Pagination
        </h2>
        <Pagination
          currentPage={0}
          totalItems={0}
          pageSize={0}
          onPageChange={function (page: number): void {
            throw new Error("Function not implemented.");
          }}
        />
        <h2 className="text-2xl font-bold text-black text-center py-10 mb-14 border-b border-b-black">
          TextBlock
        </h2>
        <TextBlock title={"Sample Test"} paragraphs={[]} />
      </div>
    </div>
  );
}
