import 'dart:convert';

import 'package:http/http.dart' as http;

void main() async {
  print("Fetching data!...");
  await Future.delayed(Duration(seconds: 2), () => print("Loading..."));

  var data = await getData();
  await Future.delayed(Duration(seconds: 2), () => print("displaying data..."));

  await Future.delayed(Duration(seconds: 1));

  if (data is List) {
    data.forEach((user) => print("${user['name']} - ${user['email']}"));
  } else {
    print(data);
  }
}

Future<dynamic> getData() async {
  var res =
      await http.get(Uri.parse('https://jsonplaceholder.typicode.com/users'));
  await Future.delayed(Duration(seconds: 2), () => print("Data loaded ..."));

  if (res.statusCode == 200) {
    return json.decode(res.body);
  }
  return 'Error: Request failed with status ${res.statusCode}';
}
