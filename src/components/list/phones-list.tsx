import * as React from "react";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { Redirect, useHistory, useRouteMatch } from "react-router";
import { deletePhone, fetchPhones } from "../../api/api-methods";

const PhonesList: React.FC = () => {
  const history = useHistory();
  const [phoneId, setPhoneId] = React.useState<string>("");
  const { mutate } = useMutation((id: string) => deletePhone(id), {
    onSuccess: () => {
      refetch();
    },
  });

  const match = useRouteMatch();
  const { data, status, refetch } = useQuery("phones", fetchPhones);

  if (status === "loading") return <>Loading ...</>;
  if (status === "error") return <>Something went wrong</>;

  if (phoneId) return <Redirect to={`${match.url}phone/${phoneId}`} />;

  return (
    <div className="list">
      <div className="header">
        <h1>PHONES </h1>
        <button onClick={() => history.push("/phone-form")} className="btn large header-btn">
          Add Phone ➕
        </button>
        <button onClick={() => history.push("/phone-form")} className="btn mini header-btn">
          ➕
        </button>
      </div>
      {(data?.phones || []).map(({ _id, imageFileName, fileImg, name, price }) => (
        <div key={_id} className="card phone-item">
          <div onClick={() => setPhoneId(_id)} className="phone-item img">
            <img height="200" src={fileImg ? `${process.env.REACT_APP_ASSET_URL}/${imageFileName}` : imageFileName} alt={name} />
          </div>
          <div onClick={() => setPhoneId(_id)} className="content">
            <h4> {name}</h4>
            <div>Price: {price}$</div>
          </div>
          <button className="btn delete" onClick={() => mutate(_id)}>
            ❌
          </button>
        </div>
      ))}
    </div>
  );
};

export default PhonesList;
