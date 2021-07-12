import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { createSerializer } from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

jest.setTimeout(15000);
