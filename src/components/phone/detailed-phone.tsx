import * as React from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import { fetchPhoneById, updatePhone } from "../../api/api-methods";
import { Phone } from "../../api/models/Phone";
import { genericReducer, StateReducer } from "../../utilities/utilities";

interface EditState {
  editMode: boolean;
  description: string;
}

const getDefaultValues = (): EditState => ({ editMode: false, description: "" });

const DetailedPhone: React.FC<any> = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [{ description, editMode }, setState] = React.useReducer<StateReducer<EditState>, EditState>(
    genericReducer,
    getDefaultValues(),
    getDefaultValues
  );
  const { data, status, refetch } = useQuery("phone", () => fetchPhoneById(id));

  const { mutate } = useMutation((update: Phone) => updatePhone(id, { ...update, description }), {
    onSuccess: () => {
      refetch();
    },
  });

  React.useEffect(() => {
    if (!description) return;
    const { id, _id, __v, ...phone } = data?.phone as any;
    if (!editMode && data?.phone && description !== data.phone.description) mutate({ ...phone, description });
  }, [description, editMode, mutate, data?.phone]);

  const editModeHandler = () =>
    setState(({ editMode }) =>
      !editMode ? { editMode: !editMode, description: data?.phone?.description || "" } : { editMode: !editMode, description }
    );

  if (status === "loading") return <>Loading ...</>;
  if (status === "error") return <>Something went wrong</>;

  const src = data?.phone?.fileImg ? `${process.env.REACT_APP_ASSET_URL}/${data?.phone?.mageFileName}` : data?.phone?.imageFileName;

  return (
    <div className="detailed-container">
      <button className="btn" onClick={() => history.push("/")}>
        ⬅ Go Back
      </button>
      <div className="card phone-item">
        {data?.phone ? (
          <>
            <div className="phone-item img">
              <img height="200" src={src} alt={data?.phone?.name} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: "0 1rem" }}>
              <h3>Name: {data?.phone?.name}</h3>
              <div className="content">
                {editMode ? (
                  <span className="field">
                    <textarea
                      rows={20}
                      placeholder="description"
                      disabled={!editMode}
                      value={description}
                      onChange={(e) => setState({ description: e.target.value })}
                    />
                  </span>
                ) : (
                  <span className="field">{data?.phone?.description}</span>
                )}
                <span className="field">Price: {data?.phone?.price}$</span>
                <span className="field">Manufacturer: {data?.phone?.manufacturer}</span>
                <span className="field">Processor: {data?.phone?.processor}</span>
                <span className="field">RAM: {data?.phone?.ram} GB</span>
                <span className="field">Screen: {data?.phone?.screen}</span>
              </div>
            </div>
          </>
        ) : (
          data?.message
        )}
      </div>
      {data?.phone && (
        <button className="btn edit" onClick={editModeHandler}>
          {editMode ? "Save 💾" : "Edit 🖊"}
        </button>
      )}
    </div>
  );
};
export default DetailedPhone;
