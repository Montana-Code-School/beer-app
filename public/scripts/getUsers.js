var UserList = React.createClass({

    render: function() {
    var userData = this.props.data.map(function(user){
            
        var that = this;

            return (
                <div> {user._id}</div>
                )
            });


        return (
            <div>
            <h1> User List </h1>
               {userData}
            </div>
            );
    }
});



var Users = React.createClass({
    getInitialState: function(){
        return {data: []};
    },

    loadUsers: function(beer) {
    // var beerPost = this.state.data;
    $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data){
            console.log("inside success")
            this.setState({data:data});
        }.bind(this),
        error: function(xhr, status, err){
            console.log("Broken url is " + this.props.url)
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
},

componentDidMount: function(){
    this.loadUsers();
},


render: function() {
    return (
        <div>
        <UserList data={this.state.data}/>
        </div>
        )
    }
})

React.render(<Users url="/api/users/"/>, document.getElementById("users"))
