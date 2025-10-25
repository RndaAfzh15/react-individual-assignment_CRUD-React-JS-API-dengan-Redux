import React, { Component } from "react";
import { Container } from "reactstrap";
import BackComp from "../Components/BackComp";
import FormComp from "../Components/FormComp";
import { connect } from "react-redux";
import { postUserCreate } from "../actions/userAction";
import swal from "sweetalert";
import { withRouter } from "react-router-dom"; // ✅ bawaan react-router-dom

const mapStateToProps = (state) => {
  return {
    getRespondDataUser: state.users.getRespondDataUser,
    errorRespondDataUser: state.users.errorRespondDataUser,
  };
};

class CreateUserContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(postUserCreate(data));
  }

  componentDidUpdate(prevProps) {
    const { getRespondDataUser, errorRespondDataUser, history } = this.props;

    // Deteksi perubahan hasil API
    if (
      getRespondDataUser !== prevProps.getRespondDataUser ||
      errorRespondDataUser !== prevProps.errorRespondDataUser
    ) {
      if (errorRespondDataUser) {
        swal("Failed!", errorRespondDataUser, "error");
      } else if (getRespondDataUser) {
        const user = getRespondDataUser;

        // ✅ Tampilkan semua data dalam format rapi
        swal(
          "User Created!",
          `Nama: ${user.nama}
Alamat: ${user.alamat}
Umur: ${user.umur}
No HP: ${user.nohp}
Kewarganegaraan: ${user.kewarganegaraan}
Tanggal Lahir: ${user.tglLahir}`,
          "success"
        ).then(() => {
          history.push("/"); // ✅ redirect ke home
        });
      }
    }
  }

  render() {
    return (
      <Container>
        <BackComp />
        <h1>Create User</h1>
        <FormComp onSubmit={(data) => this.handleSubmit(data)} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(withRouter(CreateUserContainer));
