# ReservationClient

OpenReservation angular 客户端，使用 angular 9 + material 开发，支持部署到 docker 以及 k8s

[![Build status](https://weihanli.visualstudio.com/Pipelines/_apis/build/status/OpenReservation.AngularClient.CI)](https://weihanli.visualstudio.com/Pipelines/_build/latest?definitionId=21)

## Docker

``` bash
docker run -d -p 8081:80 openreservation/angular-client:latest
```

## Kubernetes

``` bash
kubectl apply -f k8s-deploy.yaml
```

## More

预约服务器端：<https://github.com/OpenReservation/ReservationServer>
