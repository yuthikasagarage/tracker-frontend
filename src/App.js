import Routes from "./routes";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./api/authApi";
import Loader from "./components/common/Loader";
import "antd/dist/antd.css";

function App() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth.user);
	const UserFetching = useSelector((state) => state.auth?.fetching);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch, user]);

	if (UserFetching) {
		return <Loader />;
	}

	return <Routes signedIn={user} />;
}

export default App;
