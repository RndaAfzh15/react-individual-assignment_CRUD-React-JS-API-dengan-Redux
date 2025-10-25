import React, { Component } from "react";
import { Container } from "reactstrap";
import BackComp from "../Components/BackComp";
import FormComp from "../Components/FormComp";
import { connect } from "react-redux";
import { getUsersDetail, putUserUpdate } from "../actions/userAction";
import swal from "sweetalert";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getUserDetail: state.users.getUserDetail,
    getRespondDataUser: state.users.getRespondDataUser,
    errorRespondDataUser: state.users.errorRespondDataUser,
  };
};

class EditUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersDetail(this.props.match.params.id));
  }

  handleSubmit = (data) => {
    this.props.dispatch(putUserUpdate(data, this.props.match.params.id));
  };

  componentDidUpdate(prevProps) {
    // Cek kalau update berhasil atau gagal
    if (
      this.props.getRespondDataUser !== prevProps.getRespondDataUser ||
      this.props.errorRespondDataUser !== prevProps.errorRespondDataUser
    ) {
      if (this.props.errorRespondDataUser) {
        swal("Failed!", this.props.errorRespondDataUser, "error");
      } else if (this.props.getRespondDataUser) {
        const {
          nama,
          alamat,
          umur,
          nohp,
          kewarganegaraan,
          tglLahir,
        } = this.props.getRespondDataUser;

        swal(
          "User Updated!",
          `✅ Data berhasil diupdate!\n\nNama: ${nama}\nAlamat: ${alamat}\nUmur: ${umur}\nNo HP: ${nohp}\nKewarganegaraan: ${kewarganegaraan}\nTanggal Lahir: ${tglLahir}`,
          "success"
        ).then(() => {
          this.props.history.push("/"); // ✅ redirect ke home setelah OK ditekan
        });
      }
    }
  }

  render() {
    return (
      <Container>
        <BackComp />
        <h1>Edit User</h1>
        {/* ✅ Kirim data lama ke FormComp */}
        <FormComp
          onSubmit={(data) => this.handleSubmit(data)}
          initialData={this.props.getUserDetail}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(withRouter(EditUserContainer));
