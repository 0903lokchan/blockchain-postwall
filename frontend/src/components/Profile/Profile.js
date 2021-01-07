import React from 'react';
import ListItem from './ListItem';

const Profile = (props) => {
	const uid = props.match.params.uid? props.match.params.uid: props.drizzle.web3.givenProvider.selectedAddress;
	const [ posts, setPosts ] = React.useState([]);
	const [ datakey, setDatakey ] = React.useState(null);

	const toggleFollow = (targetAddress) => {
		// handle follow/unfollow function
			// try {
			// 	const follower = App.web3Provider.selectedAddress;
			// 	const followingsArray = [...await App.contracts.postwall.getFollowings(follower)];
			// 	const followersArray = [...await App.contracts.postwall.getFollowers(targetAddress)];
	
			// 	// manipulate following/followed array
			// 	const indexFollowee = followingsArray.indexOf(targetAddress);
			// 	if (indexFollowee != -1) {
			// 		followingsArray.splice(indexFollowee, 1);
			// 	} else {
			// 		followingsArray.push(targetAddress);
			// 	}
				
			// 	const indexFollower = followersArray.indexOf(follower);
			// 	if (indexFollower != -1) {
			// 		followersArray.splice(indexFollower)
			// 	} else {
			// 		followersArray.push(follower);
			// 	}
	
			// 	// upload updated arrays onto smartcontract
			// 	await App.contracts.postwall.updateFollowings(followingsArray, targetAddress, followersArray, {from: follower});
	
			// } catch (error) {
			// 	console.log("Unable to fetch user following/followed detail");
			// 	console.log(error);
			// }
		return
		}

	const fetchPosts = () => {
		const PostwallStore = props.drizzleState.contracts.Postwall;
		const data = PostwallStore.getPosts[datakey];
		if (!data) {
			return;
		}
		const rawPosts = data.value;

		// comprehend raw posts data from contract
		let posts = [];
		for (let i = 0; i < rawPosts[0].length; i++) {
			if (rawPosts[2][i].toUpperCase() === uid.toUpperCase()) {
				posts.unshift({
					id: rawPosts[0][i],
					timestamp: rawPosts[1][i],
					author: rawPosts[2][i],
					content: rawPosts[3][i]
				});
			}
		}

		setPosts(posts);
		return;
	};

	React.useEffect(
		() => {
			const { drizzle, drizzleState } = props;
			const contract = drizzle.contracts.Postwall;
			const datakey = contract.methods.getPosts.cacheCall();
			setDatakey(datakey);
			fetchPosts();
			return;
		},
		[ props ]
	);

	return (
		<main id="mainContent">
			<div className="container">
				<div className="row justify-content-center mt-5 p-0">
					<h5>User {uid}</h5>
				</div>

				<div>
					<h4>Recent Posts</h4>
					{posts.map((listItem) => (
						<ListItem
							key={'post' + listItem.id}
							timestamp={listItem.timestamp}
							author={listItem.author}
							content={listItem.content}
						/>
					))}
				</div>
			</div>
		</main>
	);
};
export default Profile;
