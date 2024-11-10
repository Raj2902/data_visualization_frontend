import sample_data from "../sample_data/jsondata.json";

function SampleData() {
  return (
    <>
      <h2
        style={{
          textAlign: "center",
          color: "white",
          textTransform: "uppercase",
          margin: "20px",
        }}
      >
        This is my sample data
      </h2>
      <div
        style={{
          margin: "10px",
          border: "1px solid black",
          backgroundColor: "white",
          overflowY: "scroll",
          height: "80vh",
        }}
      >
        <pre>{JSON.stringify(sample_data, null, 2)}</pre>
      </div>
    </>
  );
}
export default SampleData;
