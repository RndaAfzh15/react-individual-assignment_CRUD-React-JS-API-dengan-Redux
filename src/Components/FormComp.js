import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import swal from "sweetalert";

class FormComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      alamat: "",
      umur: "",
      nohp: "",
      kewarganegaraan: "WNI",
      tglLahir: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    // Hanya izinkan angka untuk umur & nohp
    if ((name === "umur" || name === "nohp") && value !== "") {
      if (!/^[0-9\b]+$/.test(value)) return; // jika bukan angka, hentikan
    }

    // Batasi nohp maksimal 12 digit
    if (name === "nohp" && value.length > 12) return;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { nama, alamat, umur, nohp, kewarganegaraan, tglLahir } = this.state;

    // Validasi wajib isi
    if (!nama || !alamat || !umur || !nohp || !kewarganegaraan || !tglLahir) {
      swal("Oops!", "Semua form harus diisi!", "warning");
      return;
    }

    // Validasi tambahan
    if (parseInt(umur) <= 0) {
      swal("Oops!", "Umur tidak boleh 0 atau negatif!", "warning");
      return;
    }

    if (nohp.length !== 12) {
      swal("Oops!", "Nomor HP harus terdiri dari 12 digit!", "warning");
      return;
    }

    // Kirim data ke parent
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="nama">Nama</Label>
          <Input
            type="text"
            name="nama"
            id="nama"
            value={this.state.nama}
            onChange={this.handleChange}
            placeholder="Masukkan nama"
          />
        </FormGroup>

        <FormGroup>
          <Label for="alamat">Alamat</Label>
          <Input
            type="textarea"
            name="alamat"
            id="alamat"
            value={this.state.alamat}
            onChange={this.handleChange}
            placeholder="Masukkan alamat lengkap"
            rows="3"
          />
        </FormGroup>

        <FormGroup>
          <Label for="umur">Umur</Label>
          <Input
            type="text"
            name="umur"
            id="umur"
            value={this.state.umur}
            onChange={this.handleChange}
            placeholder="Masukkan umur (angka saja)"
          />
        </FormGroup>

        <FormGroup>
          <Label for="nohp">No HP</Label>
          <Input
            type="text"
            name="nohp"
            id="nohp"
            value={this.state.nohp}
            onChange={this.handleChange}
            placeholder="Masukkan 12 digit no HP"
            maxLength="12"
          />
        </FormGroup>

        <FormGroup>
          <Label for="kewarganegaraan">Kewarganegaraan</Label>
          <Input
            type="select"
            name="kewarganegaraan"
            id="kewarganegaraan"
            value={this.state.kewarganegaraan}
            onChange={this.handleChange}
          >
            <option value="WNI">WNI</option>
            <option value="WNA">WNA</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="tglLahir">Tanggal Lahir</Label>
          <Input
            type="date"
            name="tglLahir"
            id="tglLahir"
            value={this.state.tglLahir}
            onChange={this.handleChange}
          />
        </FormGroup>

        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default FormComp;
