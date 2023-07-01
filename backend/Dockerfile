FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /RobWorldeMVC
EXPOSE 80
ENV ASPNETCORE_ENVIRONMENT Development

COPY RobWorldeMVC/*.csproj .
RUN dotnet restore

COPY RobWorldeMVC .
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build-env /app/publish .
ENTRYPOINT ["dotnet", "RobWorldeMVC.dll"]
