import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;

void main() async {
  print("Fetching data!...");
  await Future.delayed(Duration(seconds: 2), () => print("Loading..."));

  await displayUsers();
}

Future<void> displayUsers() async {
  final controller = StreamController<Map<String, dynamic>>(
    onListen: () => print("Displaying users...\n"),
    onCancel: () => print("\nStream closed!"),
  );

  try {
    var data = await getData(controller);

    await for (var user in controller.stream) {
      print("${user['name']} - ${user['email']}");
      // Add a delay of 1 second between printing each user
      await Future.delayed(Duration(seconds: 1));
    }
  } catch (err) {
    print(err);
  } finally {
    controller.close();
  }
}

Future<dynamic> getData(
    StreamController<Map<String, dynamic>> controller) async {
  var res =
      await http.get(Uri.parse('https://jsonplaceholder.typicode.com/users'));
  await Future.delayed(Duration(seconds: 2), () => print("Data loaded ..."));

  if (res.statusCode == 200) {
    var users = json.decode(res.body) as List<dynamic>;

    for (var user in users) {
      controller.add(user);
    }

    return 'Users fetched successfully';
  }

  return 'Error: Request failed with status ${res.statusCode}';
}
