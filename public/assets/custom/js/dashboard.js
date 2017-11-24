$(document).ready(function() {

  /* device */
  if ($('#device-add').length > 0) {
    $('#device-add').on('submit', function(e) {
      e.preventDefault();

      swal({
        title: "Tambah perangkat?",
        html: "Hanya tambahkan perangkat apabila <br />terdapat perangkat baru.",
        type: "question",
        timer: 10000,
        showCancelButton: true,
        confirmButtonText: 'Iya',
        confirmButtonColor: '#2c3e50',
        cancelButtonText: 'Tidak'
      }).then(function(result) {
        if (result.value) {
          var data = {
            'device-create-id' : $("input[name=device-create-id]").val(),
            'device-create-name' : $("input[name=device-create-name]").val(),
            'device-create-password' : $("input[name=device-create-password]").val(),
            'device-create-chair' : $("input[name=device-create-chair]").val(),
            '_method' : $("input[name=device-create-method]").val(),
            '_token' : $("input[name=device-create-token]").val()
          };

          $.ajax({
            type: "POST",
            url: "/dashboard/create/device",
            data: data,
            dataType: 'JSON',
            cache: false,
            success: function(result) {
              if (result.status == 400) {
                swal({
                  title: "Oops terjadi kesalahan",
                  html: result.text,
                  type: "warning",
                  timer: 10000,
                  showCancelButton: false,
                  confirmButtonText: 'Ok',
                  confirmButtonColor: '#2c3e50',
                });
              }
              else if (result.status == 500) {
                swal({
                  title: "Oops terjadi kesalahan",
                  html: result.text,
                  type: "error",
                  timer: 10000,
                  showCancelButton: false,
                  confirmButtonText: 'Ok',
                  confirmButtonColor: '#2c3e50',
                });
              }
              else {
                swal({
                  title: "Berhasil menambah perangkat",
                  text: result.text,
                  type: "success",
                  timer: 30000
                }).then(function(result) {
                  if (result.value) {
                    window.location = '/dashboard/device/';
                  }
                });
              }
            },
            error: function(result){

            }
          });

        }
      });

    });
  }

  if ($('form[name=search-device]').length > 0) {
    $('form[name=search-device]').on('change', function(e) {
      e.preventDefault();

      var data = {
        'device-search-query' : $("input[name=device-search-query]").val(),
        '_method' : $("input[name=device-search-method]").val(),
        '_token' : $("input[name=device-search-token]").val()
      };

      $.ajax({
        type: "POST",
        url: "/dashboard/search/device",
        data: data,
        cache: false,
        success: function(result) {
          if (result.status == 500) {
            swal({
              title: "Oops terjadi kesalahan",
              html: result.text,
              type: "warning",
              timer: 10000,
              showCancelButton: false,
              confirmButtonText: 'Ok',
              confirmButtonColor: '#2c3e50',
            });
          }
          else if (result.status == 400) {
            swal({
              title: "Oops terjadi kesalahan",
              html: result.text,
              type: "error",
              timer: 10000,
              showCancelButton: false,
              confirmButtonText: 'Ok',
              confirmButtonColor: '#2c3e50',
            });
          }
          else {
            var res = '';
            if (result.content) {
              var token = $('input[name=search_token]').val();
              for (i = 0; i < result.content.length; i++) {
                res += '<form id="device-card-change-' + result.content[i].kode_perangkat + '" action="/dashboard/update/device" method="POST" hidden="hidden">';
                res += '<div class="col-md-3 col-sm-6 col-xs-12">';
                res += '<div class="device device-' + result.content[i].status_text + '">';
                res += '<div class="device-title row"><div class="col-md-12">';
                res += '<input type="text" name="device-change-name" class="input-lengko-default block" value="' + result.content[i].nama_perangkat + '" />';
                res += '</div></div><span>(' + result.content[i].kode_perangkat + ')</span>';
                res += '<div class="row"><div class="col-md-12">';
                res += 'Kapasitas: <input type="number" name="device-change-chair" min="1" class="input-lengko-default" value="' + result.content[i].jumlah_kursi_perangkat + '" /> Orang<br />';
                res += '</div></div>';
                res += '<div class="row"><div class="col-md-12">Status:';
                res += '<select name="device-change-status" class="select-lengko-default">';
                res += '<option value="0">Tidak Tersedia</option>';
                res += '<option value="1">Tersedia</option>';
                res += '</select>';
                res += '</div></div>';
                res += '<div class="row"><div class="col-md-12">Kata sandi:';
                res += '<input type="password" name="device-change-password" class="input-lengko-default block" placeholder="(tidak diubah, kosongkan)" />';
                res += '<hr /></div></div>';
                res += '<div class="row"><div class="col-md-6 col-xs-6">';
                res += '<form action="/dashboard/delete/device/' + result.content[i].kode_perangkat + '" method="POST">';
                res += '<button class="btn-lengko btn-lengko-default pull-left" type="button" onclick="show_obj(\'device-card-' + result.content[i].kode_perangkat + '\'); hide_obj(\'device-card-change-' + result.content[i].kode_perangkat + '\');">';
                res += '<span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>';
                res += '</button><button class="btn-lengko btn-lengko-default" type="submit">';
                res += '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>';
                res += '</button>';
                res += '<input type="hidden" name="_token" value="' + token + '"><input type="hidden" name="_method" value="DELETE">';
                res += '</form></div>';
                res += '<div class="col-md-6 col-xs-6">';
                res += '<button class="btn-lengko btn-lengko-default pull-right" type="submit">';
                res += '<span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span>';
                res += '</button>';
                res += '<input type="hidden" name="device-id" value="' + result.content[i].kode_perangkat + '" />';
                res += '<input type="hidden" name="_token" value="' + token + '"><input type="hidden" name="_method" value="PUT"></div></div></div></div></form>';
                res += '<div id="device-card-' + result.content[i].kode_perangkat + '" class="col-md-3 col-sm-6 col-xs-12">';
                res += '<div class="device device-' + result.content[i].status_text + '">';
                res += '<div class="device-title row"><div class="col-md-12">';
                res += '' + result.content[i].nama_perangkat + '';
                res += '</div></div><span>(' + result.content[i].kode_perangkat + ')</span>';
                res += '<div class="row"><div class="col-md-12">';
                res += '<hr />Kapasitas: ' + result.content[i].jumlah_kursi_perangkat + '';
                res += '</div></div><div class="row">';
                res += '<div class="col-md-12">Status: ' + result.content[i].status_text_human + '';
                res += '<hr /></div></div>';
                res += '<div class="row"><div class="col-md-6 col-xs-6">';
                res += '<form action="/dashboard/delete/device/' + result.content[i].kode_perangkat + '" method="POST">';
                res += '<button class="btn-lengko btn-lengko-default pull-left" type="submit">';
                res += '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>';
                res += '</button><input type="hidden" name="_token" value="' + token + '"><input type="hidden" name="_method" value="DELETE">';
                res += '</form></div><div class="col-md-6 col-xs-6">';
                res += '<button class="btn-lengko btn-lengko-default pull-right" type="button" onclick="show_obj(\'device-card-change-' + result.content[i].kode_perangkat + '\'); hide_obj(\'device-card-' + result.content[i].kode_perangkat + '\');">';
                res += '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>';
                res += '</button>';
                res += '</div></div></div></div>';
              }
            }
            else {
              res = '<div class="padd-lr-15">Perangkat tidak ditemukan</div>';
            }
            $('#device-card-section').html(res);
            swal({
              title: "Berhasil melakukan pencarian",
              html: result.text,
              type: "success",
              timer: 30000
            });
          }
        },
        error: function(result){

        }
      });

    });
  }


  /* employee */

  if ($('form[name=employee-add]').length > 0) {
    $('form[name=employee-add]').on('submit', function(e) {
      e.preventDefault();

      swal({
        title: "Tambah pegawai?",
        html: "Hanya tambahkan pegawai apabila <br />terdapat pegawai baru.",
        type: "question",
        timer: 10000,
        showCancelButton: true,
        confirmButtonText: 'Iya',
        confirmButtonColor: '#2c3e50',
        cancelButtonText: 'Tidak'
      }).then(function(result) {
        if (result.value) {
          var data = {
            'employee-create-id' : $("input[name=employee-create-id]").val(),
            'employee-create-name' : $("input[name=employee-create-name]").val(),
            'employee-create-password' : $("input[name=employee-create-password]").val(),
            'employee-create-authority' : $("select[name=employee-create-authority]").val(),
            'employee-create-gender' : $("input[name=employee-create-gender]").val(),
            '_method' : $("input[name=employee-create-method]").val(),
            '_token' : $("input[name=employee-create-token]").val()
          };

          $.ajax({
            type: "POST",
            url: "/dashboard/create/employee",
            data: data,
            dataType: 'JSON',
            cache: false,
            success: function(result) {

              if (result.status == 500) {
                swal({
                  title: "Oops terjadi kesalahan",
                  html: result.text,
                  type: "warning",
                  timer: 10000,
                  showCancelButton: false,
                  confirmButtonText: 'Ok',
                  confirmButtonColor: '#2c3e50',
                });
              }
              else if (result.status == 400) {
                swal({
                  title: "Oops terjadi kesalahan",
                  html: result.text,
                  type: "error",
                  timer: 10000,
                  showCancelButton: false,
                  confirmButtonText: 'Ok',
                  confirmButtonColor: '#2c3e50',
                });
              }
              else {
                swal({
                  title: "Berhasil menambah pegawai",
                  text: result.text,
                  type: "success",
                  timer: 30000
                }).then(function(result) {
                  if (result.value) {
                    window.location = '/dashboard/employee/';
                  }
                });
              }
            },
            error: function(result){

            }
          });

        }
      });

    });
  }

  if ($('form[name=search-employee]').length > 0) {
    $('form[name=search-employee]').on('change', function(e) {
      e.preventDefault();

      var data = {
        'employee-search-query' : $("input[name=employee-search-query]").val(),
        '_method' : $("input[name=employee-search-method]").val(),
        '_token' : $("input[name=employee-search-token]").val()
      };

      $.ajax({
        type: "POST",
        url: "/dashboard/search/employee",
        data: data,
        cache: false,
        success: function(result) {
          if (result.status == 500) {
            swal({
              title: "Oops terjadi kesalahan",
              html: result.text,
              type: "warning",
              timer: 10000,
              showCancelButton: false,
              confirmButtonText: 'Ok',
              confirmButtonColor: '#2c3e50',
            });
          }
          else if (result.status == 400) {
            swal({
              title: "Oops terjadi kesalahan",
              html: result.text,
              type: "error",
              timer: 10000,
              showCancelButton: false,
              confirmButtonText: 'Ok',
              confirmButtonColor: '#2c3e50',
            });
          }
          else {
            var res = '';
            if (result.content) {
              var token = $('input[name=search_token]').val();

              res += '<div class="table-responsive"><table class="table table-hover table-striped">';
              res += '<tr><th>#</th><th>Nama</th><th>Jenis Kelamin</th><th>Otoritas</th><th></th></tr>';

              for (i = 0; i < result.content.length; i++) {
                res += '<tr id="employee-card-change-' + result.content[i].kode_pegawai + '" hidden="hidden">';
                res += '<td colspan="5">';
                res += '<form name="" method="post" action="/dashboard/update/employee">';
                res += '<div class="row"><div class="col-md-1">' + result.content[i].kode_pegawai + '</div>';
                res += '<div class="col-md-3"><input type="text" name="employee-change-name" class="input-lengko-default block" placeholder="Nama Pegawai" value="' + result.content[i].nama_pegawai + '" />';
                res += '<input type="password" name="employee-change-password" class="input-lengko-default block" placeholder="(Kata sandi tidak diubah, kosongkan)" value="" />';
                res += '</div><div class="col-md-3"><div class="radio-lengko-default">';
                res += '<input type="radio" name="employee-change-gender" id="gender-male-' + result.content[i].kode_pegawai + '" value="L"';
                if (result.content[i].jenis_kelamin_pegawai == "Laki-Laki") {
                  res += ' checked="checked"';
                }
                res += ' /><label for="gender-male-' + result.content[i].kode_pegawai + '">Laki-Laki</label>';
                res += '<br /><input type="radio" name="employee-change-gender" id="gender-female-' + result.content[i].kode_pegawai + '" value="P" ';
                if (result.content[i].jenis_kelamin_pegawai == "Perempuan") {
                  res += ' checked="checked"';
                }
                res += ' /><label for="gender-female-' + result.content[i].kode_pegawai + '">Perempuan</label>';

                res += '</div></div>';
                res += '<div class="col-md-3"><select name="employee-change-authority" class="select-lengko-default block">';

                for (j = 0; j < result.authority.length; j++) {
                  res += '<option value="' + result.authority[j].kode_otoritas + '"';
                  if (result.authority[j].kode_otoritas == result.content[i].kode_otoritas) {
                    res += ' selected';
                  }
                  res += ' >' + result.authority[j].nama_otoritas + '</option>';
                }

                res += '</select>';
                res += '</div><div class="col-md-2"><button class="btn-lengko btn-lengko-default pull-left" type="button" onclick="show_obj(\'employee-card-' + result.content[i].kode_pegawai + '\'); hide_obj(\'employee-card-change-' + result.content[i].kode_pegawai + '\');">';
                res += '<span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>';
                res += '</button>';
                res += '<button class="btn-lengko btn-lengko-default pull-left" type="submit">';
                res += '<span class="glyphicon glyphicon-save" aria-hidden="true"></span>';
                res += '</button>';
                res += '<input type="hidden" name="employee-id" value="' + result.content[i].kode_pegawai + '" />';
                res += '<input type="hidden" name="_token" value="' + token + '"><input type="hidden" name="_method" value="PUT">';
                res += '</div></form></td></tr>';

                res += '<tr id="employee-card-' + result.content[i].kode_pegawai + '">';
                res += '<td>' + result.content[i].kode_pegawai + '</td>';
                res += '<td>' + result.content[i].nama_pegawai + '</td>';
                res += '<td>' + result.content[i].jenis_kelamin_pegawai + '</td>';
                res += '<td>' + result.content[i].nama_otoritas + '</td><td>';
                res += '<button class="btn-lengko btn-lengko-default pull-left" type="button" onclick="show_obj(\'employee-card-change-' + result.content[i].kode_pegawai + '\'); hide_obj(\'employee-card-' + result.content[i].kode_pegawai + '\');">';
                res += '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>';
                res += '<form name="employee-delete" action="/dashboard/delete/employee/' + result.content[i].kode_pegawai + '" method="POST">';
                res += '<button class="btn-lengko btn-lengko-default" type="submit">';
                res += '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                res += '<input type="hidden" name="employee-delete-id" value="' + result.content[i].kode_pegawai + '">';
                res += '<input type="hidden" name="_token" value="' + token + '"><input type="hidden" name="_method" value="DELETE">';
                res += '</form></td></tr>';
              }
              res += '</table></div>';
            }
            else {
              res = '<div class="padd-lr-15">Pegawai tidak ditemukan</div>';
            }
            $('#employee-card-section').html(res);
            swal({
              title: "Berhasil melakukan pencarian",
              html: result.text,
              type: "success",
              timer: 30000
            });
          }
        },
        error: function(result){

        }
      });

    });
  }


  /*
    swal({
      title: "Oops terjadi kesalahan",
      html: "",
      type: "warning",
      timer: 10000,
      showCancelButton: false,
      confirmButtonText: 'Iya',
      confirmButtonColor: '#2c3e50',
    });
    */
});