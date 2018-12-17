package com.kugmax.learn.frontend.angular.clients;

import com.kugmax.learn.digitgateway.digitgateway.api.DigitAPIGrpc;
import com.kugmax.learn.digitgateway.digitgateway.api.GatewayAPI;
import com.kugmax.learn.digitgateway.digitgateway.api.SaveAndRecognizeRequest;
import com.kugmax.learn.digitgateway.digitgateway.api.SaveAndRecognizeResponse;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.stereotype.Service;

@Service
public class GatewayAPIClient {
    public int saveAndRecognize(String img) {

//      TODO: need descovery

       ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 6565)
         .usePlaintext()
         .build();

        DigitAPIGrpc.DigitAPIBlockingStub stub = DigitAPIGrpc.newBlockingStub(channel);

        SaveAndRecognizeRequest request  = SaveAndRecognizeRequest
          .newBuilder()
          .setBytes(img)
          .build();

        SaveAndRecognizeResponse response = stub.saveAndRecognize(request);
        return response.getValue();
    }
}
