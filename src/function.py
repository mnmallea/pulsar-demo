from pulsar import Function
import json

class RoutingFunction(Function):
    def __init__(self):
        self.warning_topic = "persistent://public/default/warnings"

    def process(self, item, context):
        event = json.loads(item)
        if event["temperature"] > 30:
            context.publish(self.warning_topic, item)
        else:
          context.get_logger().info("Temp is OK")
