- Để thêm một document vào một collection trên firebase cần import 2 hàm: addDoc

* syntax: addDoc(arg1, arg2)
* arg1: là một thêm chiếu đếm collection cần thêm document vào()
* arg2: là một object chứ data cần thêm vào collection trên firebase database

- Để xóa một document cần import 2 hàm: `deleteDoc`, `doc`
  (`doc` giống như `collection` nhưng chỉ tham chiếu đếm một document cụ thể)

* syntax
* const docRef = doc(db, `collection_name`, id_cần_xóa)
* deleteDoc(docRef)
