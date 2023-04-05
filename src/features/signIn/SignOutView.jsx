const SignOutView = (props) => {
    const signOut = () => {
        props.onSignOut();
    }
    return(
        <div>
            <button onClick={signOut}>
                Sign Out
            </button>
        </div>
    )
}

export default SignOutView