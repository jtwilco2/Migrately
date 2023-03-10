CREATE PROC [dbo].[ClientAttorney_Update_ByAttorneyUserId]
						@ClientId int  -- clients.id
						,@AttorneyUserId int -- users.id

AS

BEGIN

	DELETE FROM dbo.ClientAttorney 
	WHERE ClientId = @ClientId

	INSERT INTO dbo.ClientAttorney
				(ClientId
				,AttorneyId)
	SELECT	TOP 1
		@ClientId
		,ap.Id
	FROM dbo.AttorneyProfiles as ap
	WHERE ap.CreatedBy = @AttorneyUserId
END
GO
