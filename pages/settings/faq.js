import { Card, Collapse, Divider } from "antd";
import SettingLayout from "../../src/components/SettingLayout";

const Faq = () => {
  return (
    <SettingLayout>
      <Card>
        <Divider orientation="center" plain>
          Pertanyaan
        </Divider>

        <Collapse>
          <Collapse.Panel header="Pertanyaan Pertama">
            Ini adalah pertanyaan pertama
          </Collapse.Panel>
          <Collapse.Panel header="Pertanyaan kedua">
            Ini adalah jawabaan dari pertanyaan kedua
          </Collapse.Panel>
          <Collapse.Panel header="Pertanyaan ketiga">
            Ini adalah jawaban dari pertanyaan ketiga
          </Collapse.Panel>
        </Collapse>
        <Divider orientation="center" plain>
          Tutorial Video
        </Divider>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </Card>
    </SettingLayout>
  );
};

Faq.auth = {
  roles: ["USER"],
};

export default Faq;
